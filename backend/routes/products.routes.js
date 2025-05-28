import express from "express";
import { getProducts } from "../controllers/products.controller.js";


const ProductsRouter = express.Router()

ProductsRouter.get('/get-products', getProducts)


export default ProductsRouter