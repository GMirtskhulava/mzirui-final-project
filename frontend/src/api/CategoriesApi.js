import axios from 'axios';

const base_url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:2508'
  : 'https://pronia-mziuri.onrender.com';

export const getCategories = async () => {
    const response = await axios.get(`${base_url}/api/categories/get-categories`, {
        withCredentials: true,
    });
    return response;
};