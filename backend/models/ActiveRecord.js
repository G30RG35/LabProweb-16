import createConnection from "../config/DB.js"

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

        return results
    }

    async saveItem(modelName, object) {
        const { claves, valores } = await this.getArray(object)

        const query = `
            INSERT INTO ${modelName.tableName} (${claves.map(clave => clave)})
            VALUES (${valores.map(valor => "'" + valor + "'")})
        ` 

        try {
            await connetion.execute(query)
            return true
        } catch (err) {
            return
        }
    }

    async getArray(object) {
        const claves = Object.keys(object);
        const valores = claves.map((clave) => object[clave]);

        return {claves, valores}
    }
}

export default ActiveRecord