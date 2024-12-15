import jwt from "jsonwebtoken";

const secret = "thisismysecretkey";

export const getJwtToken = (details) => {
    return jwt.sign(details,secret, {expiresIn : '1h'});
}

export const verifyJwtToken = (jwtToken) => {
    return jwt.verify(jwtToken,secret)
}