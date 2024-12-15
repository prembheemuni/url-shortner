import express from 'express'
import { handleUserLogin, handleUserSignUp, handlePasswordReset } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.post("/signup",handleUserSignUp)

userRouter.post("/login",handleUserLogin)

userRouter.post("/reset", handlePasswordReset)


export default userRouter