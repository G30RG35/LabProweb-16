import Grupo from "../models/Grupo.js"
import GrupoInfo from "../models/GrupoInfo.js";

const getAllGrupos = async(req, res) => {
    const grupoObj = new GrupoInfo();

    const grupos = await grupoObj.getAllItems(GrupoInfo);

    if(grupos) {
        res.status(201).json({msg: 'Ok', status: 201, grupos});
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const addNewGrupo = async(req, res) => {
    const { grupo, grupos } = req.body;

    if(grupo) {
        const grupoObj = new Grupo(grupo);
        const response = await grupoObj.createItem(Grupo, grupoObj);

        if(response) {
            return res.status(201).json({msg: response.msg})
        } else {
            const error = new Error('Hubo un error')
            return res.status(500).json({msg: error.message})
        }
    }
}

const updateGrupo = async(req, res) => {
    const { grupo } = req.body;

    if(grupo) {
        const grupoObj = new Grupo(grupo);
        const response = await grupoObj.saveItem(Grupo, grupoObj);

        if(response) {
            return res.status(201).json({msg: "El grupo se ha actualizado correctamente"})
        } else {
            const error = new Error('Hubo un error')
            return res.status(500).json({msg: error.message})
        }
    }
}

export {
    getAllGrupos,
    addNewGrupo, 
    updateGrupo
}