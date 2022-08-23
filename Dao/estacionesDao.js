import EstacionModel from "../models/EstacionModel.js"

export const getAllEstaciones = async () => {
    let results = await EstacionModel.findAll()
    return results
}

export const createEstacion = async (station) => {
    let results = await EstacionModel.create(station)
    return results
}

export const deleteEstacion = async (id) => {
    await EstacionModel.destroy({
        where: { ID_estacion: id }
    })
    return { message: "Estación eliminada correctamente" }
}

export const updateEstacion = async (station, id) => {
    await EstacionModel.update(station, {
        where: { ID_estacion: id }
    })
    return { message: "Estación actualizada correctamente" }
}