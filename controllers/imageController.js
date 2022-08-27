import { add, getAll, remove } from "../services/imageService.js"




export const addImage = async (req, res) => {
    try {
        const { image } = req.files
        let results = await add(image, req.params.id)
        res.json(results)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const getAllImages = async (req, res) => {
    try {
        let results = await getAll(req.params.id)
        res.json(results)
    } catch (error) {
        res.status(400).send(error)
    }

}

export const removeImage = async (req, res) => {
    try {
        let results = await remove(req.params.id, req.body.name)

        res.json(results)
    } catch (error) {
        res.status(400).send(error)
    }
}