import { useState } from 'react';

import { Link } from 'react-router-dom';
import i18n from 'i18next';

import { useWishlistData } from '../context/WishlistContext';
import { useUserData } from '../context/UserContext';

function ProductCard({ id, title, price, stars, imgSrc }) {
    const { isInWishlist, addWishlistItem, removeWishlistItem } = useWishlistData();
    const { loggedIn, userData } = useUserData();

    const [clickedButton, setClickedButton] = useState(false);

    const toggleWishlist = async (productId) => {
        if(clickedButton) return console.log("Button already clicked");
        setClickedButton(true);
        if(isInWishlist(productId)) {
            if (!loggedIn) {
                removeWishlistItem(productId);
            }
            else {
                if (await removeWishlistItem(productId, userData._id)) {
                    console.log("Removed successfully");
                    // notification samomavlod
                }
                else {
                    console.log("Failed to remove item from wishlist");
                }
            }
        }
        else {
            if(!loggedIn) {
                addWishlistItem(productId);
            }
            else {
                if(await addWishlistItem(productId, userData._id)) {
                    console.log("Added successfully");
                    // notification samomavlod
                }
                else {
                    console.log("Failed to add item to wishlist");
                }
            }
        }
        setClickedButton(false);
    }
    return (
        <div className="productCard">
            <div className="productCard__image">
                <Link
                    to={`/product/${id}`}
                    className="productCard__image__link"
                >
                    <img src={imgSrc["medium"]} />
                </Link>
                <div className="productCard__image__buttons productCard-image-hover">
                    <button onClick={() => toggleWishlist(id)}>
                        <i className={`fa-solid fa-heart ${isInWishlist(id) ? 'active' : ''}`}></i>
                    </button>
                    <button onClick={() => window.location.href = `/product/${id}`}>
                        <i className="fa-solid fa-eye"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </div>

            <div className="productCard__content">
                <Link
                    className="productCard__content__title"
                    to={`/product/${id}`}
                >
                    {title[i18n.language]}
                </Link>
                <p className="productCard__content__price">${price}</p>
                <div className="productCard__content__stars">
                    {Array.from({ length: stars }).map((_, i) => (
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
