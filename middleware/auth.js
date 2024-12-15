import { verifyJwtToken } from "../services/jwt.js";
import { CustomError } from "./error.js";

export const isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return next(new CustomError("Please provide the token", 400));

  const token = authorization.split(" ")[1];

  const verifiedUserDetails = verifyJwtToken(token);

  if (!verifiedUserDetails)
    return next(new CustomError("Auth token has been expired", 401));

  res.user = verifiedUserDetails;

  next();
};
