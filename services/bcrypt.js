
import bcrypt from "bcrypt";

export const createHashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 3)
    return hashedPassword;
}

export const compareHashedPassword = async (userInputPassword, hash) => {
    const result = await bcrypt.compare(userInputPassword, hash)
    return result;
}