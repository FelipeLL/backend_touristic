import EstacionModel from "../models/EstacionModel.js";

export const getAllEstaciones = async (req, res) => {
  try {
    const estaciones = await EstacionModel.findAll();
    res.json(estaciones);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createEstacion = async (req, res) => {
  try {

    const estacion = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      longitud: req.body.longitud,
      latitud: req.body.latitud,

    };
    await EstacionModel.create(estacion);
    res.json({ message: "estación creada con exito" })
  } catch (error) {
    res.json({ message: error.message });
  }
}

export const deleteEstacion = async (req, res) => {
  try {

    await EstacionModel.destroy({
      where: { ID_Estacion: req.params.id },
    });
    res.json({ message: "Estación eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const updateEstacion = async (req, res) => {
  try {
    await EstacionModel.update(req.body, {
      where: { ID_Estacion: req.params.id },
    });
    res.json({ message: "Estación actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};




export const addImage = async (req, res) => {
  try {
    console.log(req.file);
  } catch (error) {
    console.log(error);
  }
}
