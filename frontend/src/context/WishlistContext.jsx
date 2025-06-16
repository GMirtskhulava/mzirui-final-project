import { createContext, useState, useContext } from 'react';

import { addWishlistItem as wishlistAdd, removeWishlistItem as wishlistRemove } from '../api/UsersApi';
import { useUserData } from './UserContext';

const WishlistContext = createContext({
    wishlistData: null,
});

export const useWishlistData = () => useContext(WishlistContext);

const WishlistProvider = ({ children }) => {
    const [wishlistData, setWishlistData] = useState();
    const { setUserData } = useUserData();

    const addWishlistItem = async (productId, userId = undefined) => {
        if(userId === undefined) {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if(!isInWishlist(productId)) {
                try {
                    const updatedWishlist = [...wishlist, productId];
                    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                    setWishlistData(updatedWishlist);
                    return true;
                } catch (err) {
                    console.error('Error adding item to wishlist:', err);
                    return false;
                }
            }
        } else {
            try {
                const res = await wishlistAdd(productId, userId);
                if(res.status === 200) {
                    setWishlistData(res.data.data.wishlist);
                    setUserData(res.data.data);
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error adding item to wishlist:', error);
                return false;
            }
        }

        return false;
    };

    const removeWishlistItem = async (productId, userId = undefined) => {
        if(userId === undefined) {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if(isInWishlist(productId)) {
                try {
                    const updatedWishlist = wishlist.filter(id => id !== productId);
                    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                    setWishlistData(updatedWishlist);
                    return true;
                } catch (err) {
                    console.error('Error removing item from wishlist:', err);
                    return false;
                }
            }
        } else {
            try {
                const res = await wishlistRemove(productId, userId);
                if(res.status === 200) {
                    setWishlistData(res.data.data.wishlist);
                    setUserData(res.data.data);
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error removing item from wishlist:', error);
                return false;
            }
        }

        return false;
    };

    const isInWishlist = (productId) => {
        return wishlistData ? wishlistData.includes(productId) : false;
    }

    return (
        <WishlistContext.Provider value={{ wishlistData, isInWishlist, setWishlistData, addWishlistItem, removeWishlistItem }}>
            {children}
        </WishlistContext.Provider>
    );
};

export { WishlistContext, WishlistProvider };
