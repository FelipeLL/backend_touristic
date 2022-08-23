import { getAllUsers, verifyEmailExist, createNewUser, updateUser, removeUser } from "../Dao/userDao.js"
import { hashPassword } from "../utils/hash.js"

export const getAll = async () => {
    return await getAllUsers()
}

export const create = async (name, lastname, phone, email, password) => {
    let existEmail = await verifyEmailExist(email)
    if (existEmail !== null) {
        throw "El correo ingresado ya existe"
    } else {
        const passHash = await hashPassword(password)
        const user = {
            nombre: name,
            apellido: lastname,
            telefono: phone,
            correo: email,
            password: passHash,
            ID_Tipo_usuario: 2,
        };
        return await createNewUser(user)
    }
}

export const update = async (name, lastname, phone, id) => {
    const user = {
        nombre: name,
        apellido: lastname,
        telefono: phone,

    }
    return await updateUser(user, id)
}

export const remove = async (id) => {
    return await removeUser(id)
}

