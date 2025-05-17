import ResetTokens from '../models/token.models.js';

export const checkResetTokenValidation = async (req, res) => {
    try {
        const token = req.query.checkToken;
        if(!token) {
            return res.status(400).json({ err: 'Token is required' });
        }

        const resetToken = await ResetTokens.findOne({ token });
        if(!resetToken) {
            return res.status(400).json({ err: 'Invalid or expired token' });
        }

        res.status(200).json({ msg: 'Token is valid', email: resetToken.email });
    } catch (error) {
        res.status(500).json({ err: `Server error: ${error.message}` });
    }
}