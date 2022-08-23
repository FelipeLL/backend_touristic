import UserModel from "../models/UserModel.js";

export const verifyEmailExist = async (email) => {
    let results = await UserModel.findOne({
        where: {
            correo: email
        }
    })
    return results
}