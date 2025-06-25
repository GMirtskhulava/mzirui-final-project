import Category from '../models/category.models.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json({ categories });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};