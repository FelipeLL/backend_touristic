import validator from "validator";
import { getAllEstaciones, createEstacion, deleteEstacion, updateEstacion } from "../Dao/estacionesDao.js"


export const getAll = async () => {
    return await getAllEstaciones()

}

export const create = async (name, desc, lng, lat) => {
    const station = {
        nombre: name,
        descripcion: desc,
        longitud: lng,
        latitud: lat,
    }
    if (validator.isFloat(station.longitud) === false || validator.isFloat(station.latitud) === false) {
        throw "La longitud/latitud debe ser un número"
    }
    return await createEstacion(station)
}

export const deleteOne = async (id) => {
    return await deleteEstacion(id)
}

export const update = async (name, desc, lng, lat, id) => {

    const station = {
        nombre: name,
        descripcion: desc,
        longitud: lng,
        latitud: lat,
    }

    return await updateEstacion(station, id)

}