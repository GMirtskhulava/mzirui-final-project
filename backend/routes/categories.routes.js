import express from "express";
import { getCategories } from "../controllers/categories.controller.js";


const CategoriesRouter = express.Router()

CategoriesRouter.get('/get-categories', getCategories)

export default CategoriesRouter