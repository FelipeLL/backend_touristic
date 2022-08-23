import jwt from "jsonwebtoken"
import { Config } from "../config/index.js"

export const getToken = async (id) => {
    return jwt.sign({ id }, Config.jwtSecret, {
        expiresIn: "7d"
    })
}