import Evento from "../models/Evento.js";

const getAllEventos = async(req, res) => {
    const eventoObj = new Evento();

    const eventos = await eventoObj.getAllItems(Evento);

    if(eventos) {
        res.status(201).json({msg: 'Ok', status: 201, eventos: eventos});
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const addNewEvento = async (req, res) => {
    const { evento } = req.body;
    
    try {
      const nuevoEvento = new Evento(evento);
      const response = await nuevoEvento.createItem(Evento, nuevoEvento);
      
      if(response) {
        return res.status(201).json({ msg: response.msg });
      } else {
        throw new Error('Hubo un error al crear el evento');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: error.message });
    }
  };
  
  

export {
    getAllEventos,
    addNewEvento
}