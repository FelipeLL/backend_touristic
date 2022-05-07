import EstacionModel from "../models/EstacionModel.js";
import ImageModel from "../models/ImageModel.js";
import fs from "fs"
import multer from "multer"
import { fileURLToPath } from 'url';
import path, { dirname } from "path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    const data = fs.readFileSync(path.join(__dirname, "../images/" + req.file.filename))
    const name = req.file.originalname
    const type = req.file.mimetype

    const image = {
      ID_Estacion: req.params.id,
      type,
      name,
      data
    }
    await ImageModel.create(image)


  } catch (error) {
    console.log(error);
  }
}

export const getImage = async (req, res) => {
  //const images = await ImageModel.findAll()
  console.log(req.params.id);
  if (req.params.id === "0") {

    return
  }

  const images = await ImageModel.findAll({
    where: { ID_Estacion: req.params.id },
  });

  images.map(image => {


    fs.writeFileSync(path.join(__dirname, `../dbimages/${req.params.id}/` + image.ID_Imagen + "-ruta.png"), image.data)
  })

  const imagedir = fs.readdirSync(path.join(__dirname, `../dbimages/${req.params.id}`))




  res.json(imagedir)


}
