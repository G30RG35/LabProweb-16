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
  
  const updateEvento = async (req, res) => {
    try {
      const { id } = req.params;
      const { evento } = req.body;
  
      const eventoObj = new Evento();
      const oldEvento = await eventoObj.getById(Evento, +id);
  
      const updatedEvento = {
        ID: +id,
        titulo: evento.titulo ?? oldEvento.titulo,
        descripcion: evento.descripcion ?? oldEvento.descripcion,
        fecha: evento.fecha ?? oldEvento.fecha,
        hora: evento.hora ?? oldEvento.hora,
        escolaridadID: evento.escolaridadID ?? oldEvento.escolaridadID
      };
  
      const response = await eventoObj.saveItem(Evento, updatedEvento);
  
      if (response) {
        return res.status(200).json({ msg: response.msg });
      } else {
        const error = new Error("Hubo un error");
        return res.status(500).json({ msg: error.message });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Hubo un error en el servidor" });
    }
  };
  
  const deleteEvento = async (req, res) => {
    try {
      const { id } = req.params;
      const eventoObj = new Evento();
      const response = await eventoObj.deleteItem(Evento, +id);
      if (response) {
        return res.status(200).json({ msg: response.msg });
      } else {
        const error = new Error("Hubo un error");
        return res.status(500).json({ msg: error.message });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Hubo un error en el servidor" });
    }
  };
  


export {
    getAllEventos,
    addNewEvento,
    updateEvento,
    deleteEvento
}