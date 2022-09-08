import { getAll } from "../services/iconoService.js"

export const getAllIconos = async (req, res) => {
    try {
        let results = await getAll()
        res.json(results)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error })
    }
}