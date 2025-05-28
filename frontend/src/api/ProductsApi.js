import axios from 'axios';

export const getProducts = async () => {
    const response = await axios.get('http://localhost:2508/api/products/get-products', {
        withCredentials: true,
    });
    return response;
};