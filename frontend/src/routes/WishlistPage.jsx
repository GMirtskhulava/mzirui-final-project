import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Link } from 'react-router-dom'
import { RouterPath, SkeletonLoading } from '../components/index.js'

import { useUserData, useProductsData, useWishlistData, useCartData, useNotification, useCurrencyData } from '../context/index.js';

import i18n from 'i18next'

function WishlistPage() {
    const { loggedIn, userData } = useUserData();
    const { productsData } = useProductsData();
    const { wishlistData, isInWishlist, removeWishlistItem } = useWishlistData();
    const { isInCart, addCartItem, removeCartItem } = useCartData();
    const { showNotification } = useNotification();
    const { choosedCurrency } = useCurrencyData();


    const [wishlistProducts, setWishlistProducts] = useState();
    const [clickedButton, setClickedButton] = useState(false);

    

    useEffect(() => {
        if(!productsData || !wishlistData) return;

        const matchedProducts = productsData.filter(product => wishlistData.includes(product._id));
        setWishlistProducts(matchedProducts);
    }, [wishlistData, productsData, loggedIn, userData]);


    const removeFromWishlist = async (productId) => {
        if(!isInWishlist(productId)) return console.log("Not in wishlist");
        if(!loggedIn) {
            removeWishlistItem(productId);
        }
        else {
            // console.log(await removeWishlistItem(productId, userData._id))
            if(await removeWishlistItem(productId, userData._id)) {
                console.log("Removed successfully");
                // notification samomavlod
            }
            else {
                console.log("Failed to remove item from wishlist");
            }
        }
    }

    const toggleCart = async (product) => {
        if(clickedButton) return console.log("Button already clicked");
        if(product.hidden) return console.log("Product is unavailable"), showNotification("cart", "Product is unavailable", 1);
        if(product.countInStock < 1) return showNotification("cart", "Product is not in Stock", 1)
        if(!loggedIn) return showNotification("cart", "You are not logged in", 1);
        setClickedButton(true);
        if(isInCart(product._id)) {
            if (await removeCartItem(product._id, userData._id)) {
                showNotification("cart", "Removed successfully")
            }
            else {
                console.log("Failed to remove item from cart");
                showNotification("cart", "Failed to remove item from cart", 1)
            }
        }
        else {
            if(await addCartItem({productId: product._id, productCount: 1}, userData._id)) {
                showNotification("cart", "Added successfully")
            }
            else {
                showNotification("cart", "Failed to add item from cart", 1)
            }
        }
        setClickedButton(false);
    }



    return (
        <>
            <RouterPath />
            <div className='wishlist-page'>
                <table>
                    <thead className='wishlist-page__head'>
                        <tr>
                            <th className='wishlist-page__head__remove'>Remove</th>
                            <th className='wishlist-page__head__image'>Image</th>
                            <th className='wishlist-page__head__product'>Product</th>
                            <th className='wishlist-page__head__unit-price'>Unit Price</th>
                            <th className='wishlist-page__head__stock-status'>Stock Status</th>
                            <th className='wishlist-page__head__add-to-cart'>Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody className='wishlist-page__body'>
                        {
                            wishlistProducts === undefined ? (
                                <tr>
                                    <td className='wishlist-page__body__remove'>
                                        <SkeletonLoading width='100%' height='50px' />
                                    </td>
                                    <td>
                                        <SkeletonLoading width='100%' height='8rem' />
                                    </td>
                                    <td className='wishlist-page__body__product'>
                                        <SkeletonLoading width='100%' height='2rem' />
                                    </td>
                                    <td className='wishlist-page__body__unit-price'>
                                        <SkeletonLoading width='100%' height='2rem' />
                                    </td>
                                    <td className='wishlist-page__body__stock-status'>
                                        <SkeletonLoading width='100%' height='2rem' />
                                    </td>
                                    <td className='wishlist-page__body__add-to-cart'>
                                        <SkeletonLoading width='100%' height='4rem' />
                                    </td>
                                </tr>
                            ) : wishlistProducts && wishlistProducts.length === 0 ? (
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>Products not Found</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            ) : wishlistProducts.map((product) => (
                                <tr key={product._id} className={product.hidden ? "hidden-product" : ""}>
                                    <td className='wishlist-page__body__remove'>
                                        <button className='wishlist-page__body__remove__btn' onClick={() => removeFromWishlist(product._id)}><i className="fa-solid fa-trash"></i></button>
                                        {/*  disabled={product.hidden} */}
                                    </td>
                                    <td className='wishlist-page__body__image'>
                                        <Link to={product.hidden ? '' : `/product/${product._id}`} ><img src={product.image["small"]} alt="Product" /></Link>
                                    </td>
                                    <td className='wishlist-page__body__product'>
                                        <Link to={product.hidden ? '' : `/product/${product._id}`} >{product.title[i18n.language]}</Link>
                                        {product.hidden && <span className="hidden-product-label">[Unavailable]</span>}
                                        {userData?.admin ? <p className='wishlist-page__body__product__adm-id'>ID: <span>{product._id.toString()}</span> <CopyToClipboard text={product._id}><span><i className="fa-solid fa-copy wishlist-page__body__product__adm-id__copy"></i></span></CopyToClipboard></p> : <></>}
                                    </td>
                                    <td className='wishlist-page__body__unit-price'>
                                        {choosedCurrency === "usd" ? "$" : "₾"}{product.hidden ? '-' : product.price[choosedCurrency]}
                                    </td>
                                    <td className={`wishlist-page__body__stock-status ${product.hidden ? '' : product.countInStock > 0 ? '' : 'out-of-stock'}`}>
                                        {product.hidden ? '-' : product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </td>
                                    <td className='wishlist-page__body__add-to-cart' >
                                        <button className='wishlist-page__body__add-to-cart__btn' disabled={product.hidden} onClick={() => toggleCart(product)} >{isInCart(product._id) ? "Remove from Cart" : "Add to Cart"}</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default WishlistPage