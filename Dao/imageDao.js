import ImageModel from "../models/ImageModel.js"

export const addImage = async (image) => {
    console.log("c");

    await ImageModel.create(image)
    return { message: "Imagen creada correctamente" }

}

export const getAllImages = async (idEstacion) => {
    let images = await ImageModel.findAll({
        where: {
            ID_Estacion: idEstacion
        }
    })
    return images
}

export const removeImage = async (idImage) => {
    let image = ImageModel.destroy({
        where: {
            ID_Imagen: idImage
        }
    })

    return image
}   