import { Console } from "console"
import createConnection from "../config/DB.js"
import getType from "../helpers/getType.js"

const connetion = await createConnection()

class ActiveRecord {
    static tableName = ''

    async getAllItems(modelName) {
        const [results, fields] = await connetion.execute(`SELECT * FROM ${modelName.tableName}`)

        return results
    }

    async getById(modelName, id) {
        const [results, fields] = await connetion.execute(`
            SELECT * FROM ${modelName.tableName}
            WHERE ID = ${id}
        `)

        return results[0]
    }

    async getByElement(modelName, field, value) {
        const [results, fields] = await connetion.execute(`
            SELECT * FROM ${modelName.tableName}
            WHERE ${field} = ${value}
        `)

        return results;
    }

    async saveItem(modelName, object) {
        let { claves, valores } = await this.getArray(object)

        const haveID = object.ID !== undefined;

        if (haveID) {
            return this.updateItem(modelName, object, claves)
        } else {
            return this.createItem(modelName, valores, claves)
        }
    }

    async updateItem(modelName, object, claves) {
        let query = `UPDATE ${modelName.tableName}\n`;
        query += `SET${claves.map(clave => ' ' + clave + " = " + getType(object[clave]) + "")}\n`;
        query += `WHERE ID = ${object['ID']}`

        try {
            await connetion.execute(query)
            return 'Elemento Actualizado Correctamente'
        } catch (err) {
            console.log(err)
            return
        }
    }

    async createManyItems(modelName, objects, object) {
        let { claves } = await this.getArray(object)
        const campos = claves?.filter(clave => clave !== 'ID');

        let query = `INSERT INTO ${modelName.tableName} `;
        query += `(${campos.map(clave => " " + clave)}) VALUES `;

        await objects.map((object, index) => {
            if(index === objects.length - 1) {
                return query += `(${campos.map((clave) => getType(object[clave]) + "")});`
            } else {
                return query += `(${campos.map((clave) => getType(object[clave]) + "")}),`
            }
        })

        try {
            const res = await connetion.execute(query)
            return {msg: 'Elementos Creados Correctamente', res}
        } catch (err) {
            console.log(err)
            return
        }
    }

    async createItem(modelName, valores, claves) {
        valores = valores?.filter(valor => valor !== undefined);
        const campos = claves?.filter(clave => clave !== 'ID');

        let query = `INSERT INTO ${modelName.tableName} `;
        query += `(${campos.map(clave => " " + clave)}) VALUES (${valores.map(valor => getType(valor))})`;

        try {
            const res = await connetion.execute(query)
            return {msg: 'Elemento Creado Correctamente', res}
        } catch (err) {
            console.log(err)
            return
        }
    }

    async getArray(object) {
        const claves = Object.keys(object);
        let valores = claves.map((clave) => object[clave]);

        return {claves, valores}
    }
}

export default ActiveRecord