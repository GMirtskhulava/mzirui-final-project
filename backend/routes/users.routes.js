import express from "express";
import { loginUser, registerUser, getUser, getToken, forgotPasswordUser, resetPasswordUser, checkResetTokenValidation, wishlistAdd, wishlistRemove } from "../controllers/users.controller.js";


const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/register', registerUser)
UsersRouter.get('/get-user', getUser)
UsersRouter.get('/get-token', getToken)
UsersRouter.put('/forgot-password', forgotPasswordUser)
UsersRouter.put('/reset-password', resetPasswordUser)
UsersRouter.get('/check-resetToken', checkResetTokenValidation)
UsersRouter.post('/wishlist-add', wishlistAdd);
UsersRouter.delete('/wishlist-remove', wishlistRemove);

export default UsersRouter