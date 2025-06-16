import axios from 'axios';

export const loginUser = async (email, password) => {
    const response = await axios.post(
        'http://localhost:2508/api/users/login',
        JSON.stringify({ email: email, password: password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};
export const registerUser = async (username, email, password) => {
    const response = await axios.post(
        'http://localhost:2508/api/users/register',
        JSON.stringify({ username: username, email: email, password: password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};
export const getToken = async () => {
    const response = await axios.get('http://localhost:2508/api/users/get-token', {
        withCredentials: true,
    });
    return response;
};

export const getUser = async (token) => {
    const response = await axios.get(`http://localhost:2508/api/users/get-user`, {
        headers: { Authorization: token },
    });
    return response.data;
};

export const forgotPasswordUser = async (email) => {
    const response = await axios.put(
        'http://localhost:2508/api/users/forgot-password',
        JSON.stringify({ email: email }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};

export const resetPasswordUser = async (newPassword, token) => {
    const response = await axios.put(
        'http://localhost:2508/api/users/reset-password',
        JSON.stringify({ password: newPassword, token: token }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};

export const checkResetTokenValidation = async (token) => {
    const response = await axios.get('http://localhost:2508/api/users/check-resetToken', {
        withCredentials: true,
        params: {
            checkToken: token,
        },
    });
    return response;
};

export const addWishlistItem = async (productId, userId) => {
    const response = await axios.post(
        'http://localhost:2508/api/users/wishlist-add',
        JSON.stringify({ productId: productId, userId: userId }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};
export const removeWishlistItem = async (productId, userId) => {
    const response = await axios.delete(
        'http://localhost:2508/api/users/wishlist-remove',
        {
            data: { productId, userId },
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};

export const addCartItem = async ({productId, productCount}, userId) => {
    const response = await axios.post(
        'http://localhost:2508/api/users/cart-add',
        JSON.stringify({ productId: productId, productCount: productCount, userId: userId }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};
export const removeCartItem = async (productId, userId) => {
    const response = await axios.delete(
        'http://localhost:2508/api/users/cart-remove',
        {
            data: { productId, userId },
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
    );
    return response;
};