import express from "express";
import { loginUser, registerUser, getUser, getUserById, getToken, forgotPasswordUser, resetPasswordUser, checkResetTokenValidation, wishlistAdd, wishlistRemove, cartAdd, cartRemove, updateUserData, getUserByName } from "../controllers/users.controller.js";


const UsersRouter = express.Router()

UsersRouter.post('/login', loginUser)
UsersRouter.post('/register', registerUser)
UsersRouter.get('/get-user', getUser)
UsersRouter.get('/get-user-id', getUserById)
UsersRouter.get('/get-user-name', getUserByName)
UsersRouter.get('/get-token', getToken)
UsersRouter.put('/forgot-password', forgotPasswordUser)
UsersRouter.put('/reset-password', resetPasswordUser)
UsersRouter.get('/check-resetToken', checkResetTokenValidation)
UsersRouter.post('/wishlist-add', wishlistAdd);
UsersRouter.delete('/wishlist-remove', wishlistRemove);
UsersRouter.post('/cart-add', cartAdd);
UsersRouter.delete('/cart-remove', cartRemove);
UsersRouter.put('/update-data', updateUserData);

export default UsersRouter