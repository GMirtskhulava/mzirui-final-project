import Products from '../models/products.models.js';
import '../models/category.models.js';

export const getProducts = async (req, res) => {
    try {

        const products = await Products.find().populate('category');
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};