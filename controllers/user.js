import { CustomError } from "../middleware/error.js";
import { User } from "../models/user.js";
import {
  compareHashedPassword,
  createHashPassword,
} from "../services/bcrypt.js";
import { getJwtToken } from "../services/jwt.js";
import { TryCatch } from "../utils.js";


// utility function
export const getUserByEmail = (email) => {
  return Promise.resolve(User.findOne({ email: email }));
};

export const handleUserSignUp = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) return next(new CustomError("Please provide name", 400));
  if (!email) return next(new CustomError("Please provide email", 400));
  if (!password) return next(new CustomError("Please provide password", 400));

  const isUserAlreadyThere = await getUserByEmail(email);

  if (isUserAlreadyThere)
    return next(new CustomError("User with email already exists", 400));

  const hashPassword = await createHashPassword(password);

  await User.create({
    name,
    email,
    password: hashPassword,
  });

  return res.status(200).json({
    success: true,
    message: "Sign up successfull",
  });
});

export const handleUserLogin = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password)
    return next(new CustomError("Please provide all required feilds", 400));

  const loggedUser = await getUserByEmail(email);

  if (!loggedUser) return next(new CustomError("User doesn't exist", 400));

  const isPasswordMatched = await compareHashedPassword(
    password,
    loggedUser.password
  );

  if (!isPasswordMatched)
    return next(new CustomError("Password does not match", 400));

  const authToken = getJwtToken({email : loggedUser.email, id : loggedUser._id});

  return res
    .status(200)
    .json({ success: true, message: "Login performed successfully", authToken : authToken});
});

export const handlePasswordReset = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password)
    return next(new CustomError("Please provide required details"));

  const user = await getUserByEmail(email);

  if (!user) return next(new CustomError("User with email doesn't exist"));

  const hashPassword = await createHashPassword(password)

  await User.findOneAndUpdate(
    { email: email },
    { $set: { password: hashPassword } },
    { new: true }
  );

  return res.status(200).json({success : true, message : "Password reset successful"})
});
