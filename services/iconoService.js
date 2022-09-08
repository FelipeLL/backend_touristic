import { getAllIconos } from "../Dao/iconoDao.js"

export const getAll = async () => {
    return await getAllIconos()
}