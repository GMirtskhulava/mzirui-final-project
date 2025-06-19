import express from "express";
import { getProducts, getProductById, getProductByName } from "../controllers/products.controller.js";


const ProductsRouter = express.Router()

ProductsRouter.get('/get-products', getProducts)
ProductsRouter.get('/get-product-id', getProductById)
ProductsRouter.get('/get-product-name', getProductByName)


export default ProductsRouter