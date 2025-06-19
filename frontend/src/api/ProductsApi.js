import axios from 'axios';

export const getProducts = async () => {
    const response = await axios.get('http://192.168.1.12:2508/api/products/get-products', {
        withCredentials: true,
    });
    return response;
};
export const getProductById = async (productId) => {
    const response = await axios.get('http://localhost:2508/api/products/get-product-id', {
        headers: { Authorization: productId },
    });
    return response;
};
export const getProductByName = async (productName) => {
    const response = await axios.get(`http://localhost:2508/api/products/get-product-name`, {
        params: { name: productName },
    });
    return response;
};
