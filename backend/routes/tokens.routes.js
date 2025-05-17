import express from "express";
import { checkResetTokenValidation } from "../controllers/resettokens.controller.js";


const ResetTokensRouter = express.Router()

ResetTokensRouter.get('/check-resetToken', checkResetTokenValidation)

export default ResetTokensRouter