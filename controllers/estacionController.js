import EstacionModel from "../models/EstacionModel.js";
import ImageModel from "../models/ImageModel.js";
import fs from "fs"
import validator from "validator";
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

    if (validator.isFloat(estacion.longitud) === false || validator.isFloat(estacion.latitud) === false) {
      return res.status(400).send("La longitud/latitud debe ser un número")
    }



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
    //console.log(req.file);
    const data = fs.readFileSync(path.join(__dirname, "../images/" + req.file.filename))
    const name = req.file.originalname
    const type = req.file.mimetype


    //verifica si la carpeta con el id de la estación ya existe o no
    if (fs.existsSync(path.join(__dirname, `../publicImages`, req.params.id))) {
      console.log("la carpeta ya existe");
    } else {
      fs.mkdir(path.join(__dirname, `../publicImages`, req.params.id), function (err) {
        if (err) { throw (err) }
        console.log("La carpeta ha sido creada");
      })
    }
    const url = `http://localhost:5000/${req.params.id}/` + Date.now() + "-ruta.png"




    //se crea el archivo en la carpeta publicImages en su respectivo número de estación
    fs.writeFileSync(path.join(__dirname, `../publicImages/${req.params.id}/` + Date.now() + "-ruta.png"), data)

    const image = {
      ID_Estacion: req.params.id,
      type,
      name,
      data,
      url
    }
    console.log(req.file);
    console.log(image);
    await ImageModel.create(image)
    res.json({ message: "Imagen insertada correctamente" })

  } catch (error) {
    console.log(error);
  }
}

export const getImage = async (req, res) => {
  //const images = await ImageModel.findAll()
  if (req.params.id === "0") {

    return
  }


  //trae las imagenes de la bd
  const images = await ImageModel.findAll({
    where: { ID_Estacion: req.params.id },
  });


  //itera cada imagen y verifica si ya existe para no sobreescribirla
  /* images.map(image => {
    if (fs.existsSync(path.join(__dirname, `../publicImages/${req.params.id}/` + image.ID_Imagen + "-ruta.png"))) {

      console.log("la imagen ya existe");

    } else {

      console.log("se creo la imagen");
      // fs.writeFileSync(path.join(__dirname, `../publicImages/${req.params.id}/` + image.ID_Imagen + "-ruta.png"), image.data)

    }
  }) */
  //lee cada imagen y la guarda para enviarla al frontend
  // const imagedir = fs.readdirSync(path.join(__dirname, `../publicImages/${req.params.id}`))

  const imagenes = {

    id: images.map(image => {
      return image.ID_Imagen
    })
    ,

    url: images.map(image => {
      return image.url
    }),

  }

  res.json(imagenes)

}

export const deleteImage = async (req, res) => {
  try {
    await ImageModel.destroy({
      where: { ID_Imagen: req.params.id }
    })
    res.json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
}

