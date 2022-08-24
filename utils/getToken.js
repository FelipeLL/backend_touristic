import jwt from "jsonwebtoken"
import { Config } from "../config/index.js"

export const getToken = async (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, Config.jwtSecret, {
        expiresIn: "7d"
    })
}