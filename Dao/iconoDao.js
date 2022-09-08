import IconoModel from "../models/IconoModel.js"

export const getAllIconos = async () => {
    let results = await IconoModel.findAll()
    return results
}