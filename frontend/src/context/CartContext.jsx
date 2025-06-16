import { createContext, useState, useContext } from 'react';

import { addCartItem as cartAdd, removeCartItem as cartRemove } from '../api/UsersApi';
import { useUserData } from './UserContext';

const CartContext = createContext({
    cartData: null,
});

export const useCartData = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState();
    const { loggedIn, userData, setUserData } = useUserData();

    const addCartItem = async ({productId, productCount}, userId) => {
        if(!userId || loggedIn && userData) {
            try {
                const res = await cartAdd({productId, productCount}, userId);
                if(res.status === 200) {
                    setCartData(res.data.data.cart);
                    setUserData(res.data.data);
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error adding item to cart:', error);
                return false;
            }
        }  
        else {
            return false;
        }
    };

    const removeCartItem = async (productId, userId) => {
        if(!userId || loggedIn && userData) {
            try {
                const res = await cartRemove(productId, userId);
                if(res.status === 200) {
                    setCartData(res.data.data.cart);
                    setUserData(res.data.data);
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error removing item from cart:', error);
                return false;
            }
        }  
        else {
            return false;
        }
    };

    const isInCart = (productId) => {
        return cartData ? cartData.some(item => item.productId === productId) : false;
    }

    return (
        <CartContext.Provider value={{ cartData, isInCart, setCartData, addCartItem, removeCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
