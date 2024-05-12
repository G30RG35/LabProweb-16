import Materia from "../models/Materia.js";

const getAllMaterias = async(req, res) => {
    const materiaObj = new Materia();

    try {
        const materias = await materiaObj.getAllItems(Materia);

        res.status(201).json({msg: 'Ok', status: 201, materias});
    } catch (error) {
        console.log(error)
    }
}

const getOneMateria = async(req, res) => {
    const {id} = req.params;

    const materiaObj = new Materia();
    
    try {
        const materia = await materiaObj.getById(Materia, id);

        res.status(201).json({msg: "Ok", status: 201, materia});
    } catch (error) {
        console.log(error)
    }
}

const addNewMateria = async(req, res) => {
  const { materia } = req.body;

  if (materia) {
    const materiaObj = new Materia(materia);

    try {
      const response = await materiaObj.createItem(Materia, materiaObj);
      return res.status(201).json({ msg: response.msg });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  // Resto del código para el caso de materias múltiples
};


const updateMateria = async (req, res) => {
    try {
      const { id } = req.params;
      const { materia } = req.body;

      const materiaObj = new Materia();
      const oldMateria = await materiaObj.getById(Materia, +id);
  
      const updatedMateria = {
        ID: +id,
        nombre: materia.nombre ?? oldMateria.nombre,
        activo: materia.activo ?? oldMateria.activo
      };
  
      const response = await materiaObj.saveItem(Materia, updatedMateria);
  
      if (response) {
        return res.status(200).json({ msg: response.msg });
      } else {
        throw new Error('Hubo un error');
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Hubo un error en el servidor' });
    }
  };
  

export {
    getAllMaterias, 
    getOneMateria,
    addNewMateria,
    updateMateria
}