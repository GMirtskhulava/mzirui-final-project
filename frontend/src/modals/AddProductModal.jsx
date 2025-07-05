import React, { useState, useEffect } from 'react';
import { getCategories } from '../api/CategoriesApi';
import { useNotification } from '../context/index.js';
import { createProduct } from '../api/ProductsApi';

function AddProductModal({ onClose }) {
    const { showNotification } = useNotification();
    const [newProduct, setNewProduct] = useState({
        title: { en: '', ka: '' },
        description: { en: '', ka: '' },
        price: { usd: '', gel: '' },
        countInStock: 0,
        featured: false,
        hidden: false,
        image: { small: '', medium: '' },
        category: ''
    });
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {

            try {
                const response = await getCategories();
                if (response.status === 200) {
                    setCategories(response.data.categories);
                } else {
                    console.error('Failed to fetch categories', response.data);
                }
            } catch(err) {
                console.error("Failed to load categories", err);
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        // console.log(e.target)
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');

            setNewProduct((prev) => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value },
            }));
        } else if (type === 'checkbox') {
            setNewProduct((prev) => ({ ...prev, [name]: checked }));
        } else {
            setNewProduct((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateInputs = () => {
        if (!newProduct.title.en || !newProduct.title.ka) {
            showNotification("add product", "Title is required", 1);
            return false;
        }
        if (!newProduct.description.en || !newProduct.description.ka) {
            showNotification("add product", "Description is required", 1);
            return false;
        }
        if (newProduct.countInStock < 0) {
            showNotification("add product", "Count in stock cannot be negative", 1);
            return false;
        }
        if (!newProduct.category) {
            showNotification("add product", "Category is required", 1);
            return false;
        }
        if (!newProduct.image.small || !newProduct.image.medium) {
            showNotification("add product", "Image URLs are required", 1);
            return false;
        }

        if (newProduct.price.usd < 0 || newProduct.price.gel < 0) {
            showNotification("add product", "Price cannot be negative", 1);
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        if (!validateInputs()) return;
        try {
            setSaving(true);
            const response = await createProduct(newProduct)
            if (response.status === 200) {
                onClose();
                showNotification("add product", "Product successfully created");
            }
            else {
                console.log(response);
                showNotification("add product", "Failed to create product", 1);
            }
        } catch (err) {
            console.log(err);
            showNotification("add product", "Failed to create product", 1);
        }
        setSaving(false);
    };

    return (
        <div className="edit-product-modal">
            <div className="edit-product-modal__content">
                <button className="edit-product-modal__close" onClick={onClose}>×</button>
                <h2>Add New Product</h2>

                <label>Title (EN)</label>
                <input name="title.en" value={newProduct.title.en} onChange={handleChange} />

                <label>Title (KA)</label>
                <input name="title.ka" value={newProduct.title.ka} onChange={handleChange} />

                <div className="row two-cols">
                    <div>
                        <label>Price (USD)</label>
                        <input type="text" name="price.usd" value={newProduct.price.usd} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Price (GEL)</label>
                        <input type="text" name="price.gel" value={newProduct.price.gel} onChange={handleChange} />
                    </div>
                </div>

                <label>Count in Stock</label>
                <input type="number" name="countInStock" value={newProduct.countInStock} onChange={handleChange} />

                <div className="row two-cols">
                    <div>
                        <label>Description (EN)</label>
                        <textarea name="description.en" value={newProduct.description.en} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Description (KA)</label>
                        <textarea name="description.ka" value={newProduct.description.ka} onChange={handleChange} />
                    </div>
                </div>

                <div className="row two-cols">
                    <div>
                        <label>Image URL (Small)</label>
                        <input name="image.small" value={newProduct.image.small} onChange={handleChange} />
                        {newProduct.image.small && (
                            <img src={newProduct.image.small} alt="Small preview" className="image-preview" />
                        )}
                    </div>
                    <div>
                        <label>Image URL (Medium)</label>
                        <input name="image.medium" value={newProduct.image.medium} onChange={handleChange} />
                        {newProduct.image.medium && (
                            <img src={newProduct.image.medium} alt="Medium preview" className="image-preview" />
                        )}
                    </div>
                </div>

                <div className="row checkboxes">
                    <label>
                        Featured
                        <input type="checkbox" name="featured" checked={newProduct.featured} onChange={handleChange} />
                    </label>
                    <label>
                        Hidden
                        <input type="checkbox" name="hidden" checked={newProduct.hidden} onChange={handleChange} />
                    </label>
                </div>

                <label>Category</label>
                <select name="category" value={newProduct.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <button className="edit-product-modal__save" onClick={handleSubmit} disabled={saving}>{saving ? "Saving..." : "Add Product"}</button>
            </div>
        </div>
    );
}

export default AddProductModal;