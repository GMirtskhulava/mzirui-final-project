import axios from 'axios';

const base_url = `https://pronia-mziuri.onrender.com`

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
