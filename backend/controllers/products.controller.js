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

export const updateProductData = async (req, res) => {
    try {
        const { productId, newData } = req.body;
        const product = await Products.findById(productId);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        // console.log(newData);

        const updates = {};

        // Title
        if (newData.title?.en && newData.title.en !== product.title?.en) {
            updates["title.en"] = newData.title.en
            // console.log("modified title");
        }
        if (newData.title?.ka && newData.title.ka !== product.title?.ka) {
            updates["title.ka"] = newData.title.ka
            // console.log("modified title");
        }

        // Description
        if (newData.description?.en && newData.description.en !== product.description?.en) {
            updates["description.en"] = newData.description.en
            // console.log("modified description");
        }
        if (newData.description?.ka && newData.description.ka !== product.description?.ka) {
            updates["description.ka"] = newData.description.ka
            // console.log("modified description");
        }

        // Price
        if (parseInt(newData.price.usd) !== product.price?.usd) {
            updates["price.usd"] = parseFloat(newData.price.usd).toFixed(2)
        }
        if (parseInt(newData.price.gel) !== product.price?.gel) {
            updates["price.gel"] = parseFloat(newData.price.gel).toFixed(2)
        }

        // Count
        if (parseInt(newData.countInStock) !== product.countInStock) {
            updates.countInStock = newData.countInStock
        }

        // Featured
        if (typeof newData.featured === "boolean" && newData.featured !== product.featured) {
            updates.featured = newData.featured
        }

        // Hidden
        if (typeof newData.hidden === "boolean" && newData.hidden !== product.hidden) {
            updates.hidden = newData.hidden
        }

        // Image
        if (newData.image?.medium && newData.image.medium !== product.image?.medium) {
            updates["image.medium"] = newData.image.medium
        }
        if (newData.image?.small && newData.image.small !== product.image?.small) {
            updates["image.small"] = newData.image.small
        }

        // Category
        // console.log(newData.category, newData.category.length);
        if (String(newData.category).length > 2 && newData.category && String(newData.category) !== String(product.category)) {
            // console.log(newData.category)
            updates.category = newData.category
        }

        // console.log(updates);
        if (Object.keys(updates).length === 0) {
            return res.status(204).json({ msg: "No changes detected", data: product });
        }

        // update
        const updated = await Products.findByIdAndUpdate(productId, updates, {
            new: true,
            runValidators: true,
        }).populate("category");

        res.status(200).json({ msg: "Product updated", data: updated });

    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};
export const createNewProduct = async (req, res) => {
    try {
        const { newProductData } = req.body;

        newProductData.price.usd = parseFloat(newProductData.price.usd).toFixed(2);
        newProductData.price.gel = parseFloat(newProductData.price.gel).toFixed(2);

        const newProduct = await Products.create(newProductData);

        res.status(200).json({ msg: "Product created", data: newProduct });

    } catch (err) {
        console.error("Creating product error:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { productId } = req.body;
        if (!productId) return res.status(400).json({ msg: "Product ID is required" });

        const deletedProduct = await Products.findByIdAndDelete(productId);
        if (!deletedProduct) return res.status(404).json({ msg: "Product not found" });

        res.status(200).json({ msg: "Product deleted successfully", data: deletedProduct });
    } catch (err) {
        console.error("Delete product error:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};