import axios from 'axios';

export const checkResetTokenValidation = async (token) => {
    const response = await axios.get('http://localhost:2508/api/resetTokens/check-resetToken', {
        withCredentials: true,
        params: {
            checkToken: token,
        },
    });
    return response;
};
