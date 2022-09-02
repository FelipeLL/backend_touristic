import { verifyEmailExist } from "../Dao/authDao.js"
import { comparePassword } from "../utils/hash.js"
import { getToken } from "../utils/getToken.js"
import { Config } from "../config/index.js"
import jwt from "jsonwebtoken";
import { promisify } from "util";

export const login = async (email, password) => {
    let isOnline = null;
    let isAdmin = false;
    let existEmail = await verifyEmailExist(email)
    if (existEmail === null || !(await comparePassword(password, existEmail.password))) {
        throw "El correo y/o contraseña son incorrectos"
    } else {
        const typeUser = existEmail.ID_Tipo_usuario;
        typeUser === 1 ? (isAdmin = true) : (isAdmin = false);

        isOnline = true;

        const token = await getToken(existEmail.ID_Usuario, isAdmin)
        const cookiesOptions = {
            expires: new Date(
                Date.now() +
                parseInt(Config.cookiesExpire) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };
        return { isOnline, isAdmin, cookiesOptions, token }

    }

}

export const read = async (token) => {

    const decodify = await promisify(jwt.verify)(
        token,
        Config.jwtSecret,
    );

    return { isAdmin: decodify.isAdmin, isToken: true, idUser: decodify.id }

}