import EstacionModel from "../models/EstacionModel.js";
import ImageModel from "../models/ImageModel.js";
import { getAll, create, deleteOne, update } from "../services/estacionService.js";

export const getAllEstaciones = async (req, res) => {
  try {
    let results = await getAll()
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const createEstacion = async (req, res) => {
  try {
    let results = await create(req.body.nombre, req.body.descripcion, req.body.longitud, req.body.latitud)
    res.json(results)
  } catch (error) {
    res.status(400).json({ error: error })

  }
}
export const deleteEstacion = async (req, res) => {
  try {

    let results = await deleteOne(req.params.id)
    res.json(results)
  } catch (error) {
    res.status(400).json({ error: error })
  }
};

export const updateEstacion = async (req, res) => {
  try {

    let results = await update(req.body.nombre, req.body.descripcion, req.body.longitud, req.body.latitud, req.params.id)
    res.json(results)

  } catch (error) {
    res.status(400).json({ error: error })
  }
};

export const addImage = async (req, res) => {
  try {

    // await ImageModel.create(image)
    // res.json({ message: "Imagen insertada correctamente" })

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

