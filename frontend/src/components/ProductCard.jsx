import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useWishlistData, useUserData, useCartData, useNotification, useCurrencyData } from '../context/index.js';

function ProductCard({ product }) {
    const { loggedIn, userData } = useUserData();
    const { isInWishlist, addWishlistItem, removeWishlistItem } = useWishlistData();
    const { isInCart, addCartItem, removeCartItem } = useCartData();
    const { choosedCurrency } = useCurrencyData();
    const { i18n } = useTranslation();
    const { showNotification } = useNotification();


    const [clickedButton, setClickedButton] = useState(false);

    // console.log(product)

    const toggleWishlist = async (productId) => {
        if(clickedButton) return console.log("Button already clicked");
        setClickedButton(true);
        if(isInWishlist(productId)) {
            if (!loggedIn) {
                removeWishlistItem(productId);
                showNotification("wishlist", "Removed successfully")
            }
            else {
                if (await removeWishlistItem(productId, userData._id)) {
                    console.log("Removed successfully");
                    showNotification("wishlist", "Removed successfully")
                }
                else {
                    console.log("Failed to remove item from wishlist");
                    showNotification("wishlist", "Failed to remove item from wishlist", 1)
                }
            }
        }
        else {
            if(!loggedIn) {
                addWishlistItem(productId);
                showNotification("wishlist", "Added successfully")
            }
            else {
                if(await addWishlistItem(productId, userData._id)) {
                    console.log("Added successfully");
                    showNotification("wishlist", "Added successfully")
                }
                else {
                    showNotification("wishlist", "Failed to add item from wishlist", 1)
                }
            }
        }
        setClickedButton(false);
    }
    const toggleCart = async (productId) => {
        if(clickedButton) return console.log("Button already clicked");
        if(product.hidden) return console.log("Product is unavailable"), showNotification("cart", "Product is unavailable", 1);
        if(product.countInStock < 1) return showNotification("cart", "Product is not in Stock", 1)
        if(!loggedIn) return showNotification("cart", "You are not logged in", 1);
        setClickedButton(true);
        if(isInCart(productId)) {
            if (await removeCartItem(productId, userData._id)) {
                showNotification("cart", "Removed successfully")
            }
            else {
                console.log("Failed to remove item from cart");
                showNotification("cart", "Failed to remove item from cart", 1)
            }
        }
        else {

            if(await addCartItem({productId, productCount: 1}, userData._id)) {
                showNotification("cart", "Added successfully")
            }
            else {
                showNotification("cart", "Failed to add item from cart", 1)
            }
        }
        setClickedButton(false);
    }
    
    return (
        <div className="productCard">
            <div className="productCard__image">
                <Link
                    to={`/product/${product._id}`}
                    className="productCard__image__link"
                >
                    <img src={product.image["medium"]} />
                </Link>
                <div className="productCard__image__buttons productCard-image-hover">
                    <button onClick={() => toggleWishlist(product._id)}>
                        <i className={`fa-solid fa-heart ${isInWishlist(product._id) ? 'active' : ''}`}></i>
                    </button>
                    <button onClick={() => window.location.href = `/product/${product._id}`}>
                        <i className="fa-solid fa-eye"></i>
                    </button>
                    <button onClick={() => toggleCart(product._id)}>
                        <i className={`fa-solid fa-cart-shopping ${isInCart(product._id) ? 'active' : ''}`}></i>
                    </button>
                </div>
            </div>

            <div className="productCard__content">
                <Link
                    className="productCard__content__title"
                    to={`/product/${product._id}`}
                >
                    {product.title[i18n.language]}
                </Link>
                <p className="productCard__content__price">{choosedCurrency === "usd" ? "$" : "₾"}{product.price[choosedCurrency].toFixed(2)}</p>
                <div className="productCard__content__stars">
                    {Array.from({ length: product.stars }).map((_, i) => (
                        <i
                            key={i}
                            className="fa-solid fa-star"
                        ></i>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
