import UserModel from "../models/UserModel.js"

export const getAllUsers = async () => {
    let results = await UserModel.findAll()
    return results
}

export const getUser = async (id) => {
    let results = await UserModel.findAll({
        where: {
            ID_Usuario: id
        }
    })
    return results
}

export const createNewUser = async (user) => {
    await UserModel.create(user)
    return { message: "Usuario registrado correctamente" }
}

export const verifyEmailExist = async (email) => {
    let results = await UserModel.findOne({
        where: {
            correo: email
        },
    })
    return results
}

export const updateUser = async (user, id) => {
    await UserModel.update(user, {
        where: { ID_usuario: id }
    })
    return { message: "Usuario actualizado correctamente" }
}

export const updatePassword = async (user, id) => {
    await UserModel.update(user, {
        where: { ID_usuario: id }
    })
    return { message: "Contraseña actualizada correctamente" }
}

export const removeUser = async (id) => {

    await UserModel.destroy({
        where: { ID_usuario: id }
    })

    return { message: "Usuario eliminado correctamente" }

}

export const updateImageProfile = async (user, idUser) => {
    await UserModel.update(user, {
        where: { ID_Usuario: idUser }
    })

    return { message: "Imagen actualizada correctamente" }
}