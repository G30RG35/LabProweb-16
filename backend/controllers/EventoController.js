import Evento from "../models/Evento.js"

const getAllEvents = async(req, res) => {
    const eventoObj = new Evento()
    const eventos = await eventoObj.getAllItems(Evento);

    if(eventos) {
        res.status(201).json({msg: 'Ok', status: 201, eventos});
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const addNewEvent = async(req, res) => {
    const { evento } = req.body

    const eventoObj = new Evento(evento)
    const response = await eventoObj.createItem(Evento, eventoObj)

    if(response) {
        return res.status(201).json({msg: "Evento creado correctamente"})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

export {
    getAllEvents, 
    addNewEvent
}