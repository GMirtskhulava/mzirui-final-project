import axios from 'axios';

const base_url = `https://pronia-mziuri.onrender.com`
// const base_url = `http://localhost:2508`

export const getCategories = async () => {
    const response = await axios.get(`${base_url}/api/categories/get-categories`, {
        withCredentials: true,
    });
    return response;
};