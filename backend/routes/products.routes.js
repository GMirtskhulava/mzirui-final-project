import express from "express";
import { getProducts, getProductById, getProductByName, updateProductData, createNewProduct, deleteProduct } from "../controllers/products.controller.js";


const ProductsRouter = express.Router()

ProductsRouter.get('/get-products', getProducts)
ProductsRouter.get('/get-product-id', getProductById)
ProductsRouter.get('/get-product-name', getProductByName)
ProductsRouter.put('/update-data', updateProductData)
ProductsRouter.post('/create', createNewProduct)
ProductsRouter.delete('/delete', deleteProduct)


export default ProductsRouter