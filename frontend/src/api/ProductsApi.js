import axios from 'axios';

const base_url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:2508'
  : 'https://pronia-mziuri.onrender.com';

export const getProducts = async () => {
    const response = await axios.get(`${base_url}/api/products/get-products`, {
        withCredentials: true,
    });
    return response;
};
export const getProductById = async (productId) => {
    const response = await axios.get(`${base_url}/api/products/get-product-id`, {
        headers: { Authorization: productId },
    });
    return response;
};
export const getProductByName = async (productName) => {
    const response = await axios.get(`${base_url}/api/products/get-product-name`, {
        params: { name: productName },
    });
    return response;
};


export const updateProductData = async (productId, newData) => {
    const response = await axios.put(
        `${base_url}/api/products/update-data`,
        JSON.stringify({ productId, newData }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};

export const createProduct = async (newProductData) => {
    const response = await axios.post(
        `${base_url}/api/products/create`,
        JSON.stringify({ newProductData }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};


export const deleteProduct = async (productId) => {
    const response = await axios.delete(`${base_url}/api/products/delete`, {
        data: { productId },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
    return response;
};