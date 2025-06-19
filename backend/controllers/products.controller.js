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
        const productId = req.header('Authorization');
        // console.log(productId);
        const product = await Products.findById(productId).populate('category');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        console.log(productId);
        res.status(200).json({ data: product });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
export const getProductByName = async (req, res) => {
    const name = req.query.name;
    // console.log(name);
    if (!name || name.trim().length === 0) {
        return res.status(400).json({ message: 'Missing or empty search term' });
    }

    try {
        const regex = new RegExp(name, 'i');
        const results = await Products.find({
            $or: [
                { 'title.en': regex },
                { 'title.ka': regex },
            ]
        }).limit(10);

        return res.status(200).json({ data: results });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};
