import ImageModel from "../models/ImageModel.js"

export const addImage = async (image) => {

    await ImageModel.create(image)
    return { message: "Imagen creada correctamente" }

}