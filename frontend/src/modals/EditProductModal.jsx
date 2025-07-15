import React, { useState, useEffect } from 'react';
import { getCategories } from '../api/CategoriesApi';
import { updateProductData } from '../api/ProductsApi';
import { useNotification } from '../context/index.js';

function EditProductModal({ product, onClose, onSave }) {
    const { showNotification } = useNotification();
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // con sole.log(editedProduct.category)
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response.status === 200) {
                    setCategories(response.data.categories);
                }
                else {
                    console.error('Failed to fetch categories', response.data);
                }
            } catch(err) {
                console.log("Failed to fetch categories:", err)
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditedProduct((prev) => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value },
            }));
        } else if (type === 'checkbox') {
            setEditedProduct((prev) => ({ ...prev, [name]: checked }));
        } else {
            setEditedProduct((prev) => ({ ...prev, [name]: value }));
        }
    };
    const validateInputs = () => {
        const { title, price, countInStock } = editedProduct;
        if (!title?.en || !title?.ka) {
            showNotification("edit product", "Title is required", 1);
            return false;
        }
        if (!price?.usd || !price?.gel) {
            showNotification("edit product", "Price is required", 1);
            return false;
        }
        if (countInStock < 0) {
            showNotification("edit product", "Count in stock must be positive", 1);
            return false;
        }
        if (!editedProduct.category) {
            showNotification("edit product", "Category is required", 1);
            return false;
        }
        return true;

    }
    const handleSubmit = async () => {
        if (!validateInputs()) {
            showNotification("edit product", "Please fill all required fields", 1);
            return;
        }
        if(saving) return;
        try {
            setSaving(true);
            const response = await updateProductData(product._id, editedProduct)
            console.log(response);
            if(response.status === 204) {
                showNotification("update product", "Nothing to update");
            }
            else if(response.status === 200) {
                showNotification("update product", "Product successfully updated");
                onSave(response.data.data);
            }
        } catch(err) {
            console.log(err);
            showNotification("update product", "Failed to update product data", 1);
        }
        setSaving(false);
    };

    return (
        <div className="edit-product-modal">
            <div className="edit-product-modal__content">
                <button className="edit-product-modal__close" onClick={onClose}>×</button>
                <h2>Edit Product</h2>

                <label>Title (EN)</label>
                <input name="title.en" value={editedProduct.title?.en || ''} onChange={handleChange} />

                <label>Title (KA)</label>
                <input name="title.ka" value={editedProduct.title?.ka || ''} onChange={handleChange} />

                <div className="row two-cols">
                    <div className='two-cols__col'>
                        <label>Price (USD)</label>
                        <input type="text" name="price.usd" value={editedProduct.price?.usd || '0'} min="0" onChange={handleChange} />
                    </div>
                    <div className='two-cols__col'>
                        <label>Price (GEL)</label>
                        <input type="text" name="price.gel" value={editedProduct.price?.gel || '0'} min="0" onChange={handleChange} />
                    </div>
                </div>

                <label>Count in Stock</label>
                <input type="number" name="countInStock" value={editedProduct.countInStock || 0} onChange={handleChange} />

                <div className="row two-cols">
                    <div className='two-cols__col'>
                        <label>Description (EN)</label>
                        <textarea name="description.en" value={editedProduct.description?.en || ''} onChange={handleChange} />
                    </div>
                    <div className='two-cols__col'>
                        <label>Description (KA)</label>
                        <textarea name="description.ka" value={editedProduct.description?.ka || ''} onChange={handleChange} />
                    </div>
                </div>

                <div className="row two-cols">
                    <div className='two-cols__col'>
                        <label>Image URL</label>
                        <input name="image" value={editedProduct.image || ''} onChange={handleChange} />
                        {editedProduct.image && (
                            <img src={editedProduct.image} alt="Image preview" className="image-preview" />
                        )}
                    </div>

                </div>

                <div className="row checkboxes">
                    <label>
                        Featured
                        <input type="checkbox" name="featured" checked={editedProduct.featured} onChange={handleChange} />
                    </label>
                    <label>
                        Hidden
                        <input type="checkbox" name="hidden" checked={editedProduct.hidden} onChange={handleChange} />
                    </label>
                </div>

                <label>Category</label>
                <select name="category" value={typeof editedProduct.category === 'object' ? editedProduct.category._id : editedProduct.category}
                     onChange={handleChange}>
                    <option value="">Select Category</option>
                    { categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <button className="edit-product-modal__save" onClick={handleSubmit} disabled={saving}>{saving ? "Saving..." : "Save"}</button>

            </div>
        </div>
    );
}

export default EditProductModal;
