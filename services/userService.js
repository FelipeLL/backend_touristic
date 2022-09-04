import { getAllUsers, getUser, verifyEmailExist, createNewUser, updateUser, updatePassword, removeUser, } from "../Dao/userDao.js"
import { hashPassword, comparePassword } from "../utils/hash.js"

export const getAll = async () => {
    return await getAllUsers()
}

export const getOne = async (id) => {
    return await getUser(id)
}

export const create = async (name, email, password) => {
    let existEmail = await verifyEmailExist(email)
    if (existEmail !== null) {
        throw "El correo ingresado ya existe"
    } else {
        const passHash = await hashPassword(password)
        const user = {
            nombre: name,
            correo: email,
            password: passHash,
            ID_Tipo_usuario: 2,
        };
        return await createNewUser(user)
    }
}

export const update = async (name, email, id) => {
    const user = {
        nombre: name,
        correo: email
    }
    return await updateUser(user, id)
}

export const updatePass = async (currentPass, newPass, id,) => {
    const user = await getOne(id)
    const results = await comparePassword(currentPass, user[0].password)

    if (results) {
        const passHash = await hashPassword(newPass)
        const user = {
            password: passHash
        }
        return await updatePassword(user, id)
    } else {
        throw "La contraseña actual es incorrecta"
    }
}

export const remove = async (id) => {
    return await removeUser(id)
}

