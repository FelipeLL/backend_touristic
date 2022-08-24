import { add } from "../services/imageService.js"




export const addImage = async (req, res) => {
    try {
        const { image } = req.files
        let results = await add(image, req.params.id)
        res.json(results)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAllImages = async (req, res) => {

}