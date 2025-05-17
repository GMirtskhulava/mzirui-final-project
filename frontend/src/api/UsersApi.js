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
