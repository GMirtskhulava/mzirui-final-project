import express from "express";
import { loginUser, registerUser, getToken, forgotPasswordUser, resetPasswordUser, checkResetTokenValidation } from "../controllers/users.controller.js";


const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/register', registerUser)
UsersRouter.get('/get-token', getToken)
UsersRouter.put('/forgot-password', forgotPasswordUser)
UsersRouter.put('/reset-password', resetPasswordUser)
UsersRouter.get('/check-resetToken', checkResetTokenValidation)


export default UsersRouter