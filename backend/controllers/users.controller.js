import Users from '../models/users.model.js';
import ResetTokens from '../models/token.models.js';
import jwt from 'jsonwebtoken';
import { HashString, CompareHash } from '../utils/bcrypt.js';
import mailSender from '../utils/mailSender.js';

export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim().toLowerCase();
        password = password.trim();

        const user = await Users.findOne({ email });
        if (!user || !(await CompareHash(password, user.password))) {
            return res.status(400).json({ err: 'Invalid email or password' });
        }


        res.clearCookie('token');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 Dge
        });
        res.status(200).json({ data: user, msg: 'Login successful' });
    } catch (error) {
        res.status(500).json({ err: `Server error: ${error.message}` });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ data: 'User has successfully logged out' });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        username = username.trim();
        email = email.trim().toLowerCase();
        password = password.trim();

        const existingUser = await Users.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ err: 'Email already exists' });
        }

        const hashedPassword = await HashString(password);
        const newUser = new Users({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ err: `Server error: ${error.message}` });
    }
}

export const getUser = async (req, res) => {
    try {
        const token = req.header('Authorization');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userData = await Users.findById(decoded.id).select('-password');

        return res.status(200).json({ data: userData });
    } catch (error) {
        return res.status(500).json({ err: error });
    }
};

export const getToken = (req, res) => {
    try {
        // res.clearCookie('token');
        const token = req.cookies.token;
        if (!token) return res.status(400).json({ err: 'Token not found!' });

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) return res.status(400).json({ msg: 'Please login now!' });
            res.status(200).json({ token });
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
    
};
export const forgotPasswordUser = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({ err: 'Email is required' });
        }

        const user = await Users.findOne({ email });

        if(!user) {
            return res.status(404).json({ err: 'User with this email not found!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10min' })

        const existingToken = await ResetTokens.findOne({ token: token });
        if(!existingToken) {
            const newToken = new ResetTokens({ token, email });
            await newToken.save();
        }
        else return res.status(400).json({ err: 'Token already exists!' });

        const resetLink = `http://localhost:5173/reset-password/${token}`;

        await mailSender(email, resetLink);

        res.status(200).json({ msg: 'Password reset link sent to your email' });

    } catch(err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ err: 'Internal server error' });
    }
};

export const resetPasswordUser = async (req, res) => {
    try {
        const { password, token } = req.body;

        if(!password || !token) {
            return res.status(400).json({ err: 'Password and token are required' });
        }

        const existingToken = await ResetTokens.findOne({ token: token });
        if(!existingToken) {
            return res.status(401).json({ err: 'Token not found' });
        }

        let decoded;
        try {
            decoded = jwt.verify(existingToken.token, process.env.JWT_SECRET_KEY);
        } catch(err) {
            return res.status(401).json({ err: 'Invalid or expired token' });
        }

        const user = await Users.findById(decoded.id);
        if(!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        const hashedPassword = await HashString(password);

        user.password = hashedPassword;
        await user.save();

        const tokenToDelete = await ResetTokens.findOne({ token: token });
        if(tokenToDelete) {
            await ResetTokens.deleteOne({ token: token });
        }
        
        res.clearCookie('token');
        res.status(200).json({ msg: 'Password reset successfully' });

    } catch(err) {
        console.error('Reset password error:', err);
        res.status(500).json({ err: 'Internal server error' });
    }
};

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

export const wishlistAdd = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        if(!productId) {
            return res.status(400).json({ err: 'Product ID is required' });
        }

        const user = await Users.findById(userId);
        if(!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        if(!user.wishlist) {
            user.wishlist = [];
        }
        const updatedWishlist = [...user.wishlist, productId];
        const updatedUser = await Users.findOneAndUpdate({ _id: userId }, { wishlist: updatedWishlist }, { new: true } );

        res.status(200).json({ msg: 'Product added to wishlist', data: updatedUser });
    } catch (error) {
        res.status(500).json({ err: `Server error: ${error.message}` });
    }
}
export const wishlistRemove = async (req, res) => {
    try {
        console.log(req.body)
        const { productId, userId } = req.body;
        if(!productId) {
            return res.status(400).json({ err: 'Product ID is required' });
        }

        const user = await Users.findById(userId);

        if(!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        const updatedWishlist = user.wishlist.filter(id => id.toString() !== productId.toString());
        const updatedUser = await Users.findOneAndUpdate({ _id: userId }, { wishlist: updatedWishlist }, { new: true } );

        res.status(200).json({ msg: 'Product removed from wishlist', data: updatedUser });
        console.log("deleted");
    } catch (error) {
        res.status(500).json({ err: `Server error: ${error.message}` });
    }
}

export const cartAdd = async (req, res) => {
    try {
        let { productId, productCount, userId } = req.body;

        if(!productId) {
            return res.status(400).json({ err: 'Product ID is required' });
        }

        if(productCount < 1) productCount = 1;

        const user = await Users.findById(userId);
        if(!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        if(!user.cart) {
            user.cart = [];
        }

        const existingIndex = user.cart.findIndex(
            item => item.productId.toString() === productId
        );

        if(existingIndex !== -1) { // zveli
            user.cart[existingIndex].productCount = productCount;
        } else {
            user.cart.push({ productId, productCount });
        }
        if(!user.wishlist) {
            user.wishlist = [];
        }
        const updatedCart = user.cart;
        const updatedUser = await Users.findOneAndUpdate({ _id: userId }, { cart: updatedCart }, { new: true } );

        res.status(200).json({ msg: 'Product updated in cart', data: updatedUser });
    } catch (error) {
        res.status(500).json({ err: `Server error: ${error.message}` });
    }
}

export const cartRemove = async (req, res) => {
    try {
        console.log(req.body)
        const { productId, userId } = req.body;
        if(!productId) {
            return res.status(400).json({ err: 'Product ID is required' });
        }

        const user = await Users.findById(userId);

        if(!user) {
            return res.status(404).json({ err: 'User not found' });
        }

        const updatedCart = user.cart.filter(
            item => item.productId.toString() !== productId.toString()
        );
        const updatedUser = await Users.findOneAndUpdate({ _id: userId }, { cart: updatedCart }, { new: true } );

        res.status(200).json({ msg: 'Product removed from cart', data: updatedUser });
        console.log("deleted");
    } catch (error) {
        res.status(500).json({ err: `Server error: ${error.message}` });
    }
}