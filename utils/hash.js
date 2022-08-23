import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
    let passHash = await bcryptjs.hash(password, 8)
    return passHash
}

export const comparePassword = async (password, passwordResults) => {
    return await bcryptjs.compare(password, passwordResults)
}