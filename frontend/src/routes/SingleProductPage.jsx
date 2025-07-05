import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { RouterPath, Shipping } from '../components/index.js';
import EditProductModal from '../modals/EditProductModal.jsx';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useUserData, useProductsData, useWishlistData, useCartData, useNotification, useCurrencyData } from '../context/index.js';

import { deleteProduct } from '../api/ProductsApi.js';


function SingleProductPage() {
    const { id } = useParams();
    const { loggedIn, userData } = useUserData();
    const { productsData } = useProductsData();
    const { isInWishlist, addWishlistItem, removeWishlistItem } = useWishlistData();
    const { isInCart, addCartItem, removeCartItem } = useCartData();
    const { choosedCurrency } = useCurrencyData();
    const { i18n } = useTranslation();
    const { showNotification } = useNotification();

    const [product, setProduct] = useState(null);
    const [clickedButton, setClickedButton] = useState(false);
    const [productCount, setProductCount] = useState(0);

    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        if (!productsData) {
            setProduct(null);
        } else {
            const found = productsData.find(item => item._id === id);
            setProduct(found || false);
            setProductCount(found.countInStock === 0 ? 0 : 1)

        }
    }, [productsData, id]);

    const toggleWishlist = async (productId) => {
        if (!userData?.admin && product.hidden) return console.log("Product is unavailable");
        if (clickedButton) return console.log("Button already clicked");
        setClickedButton(true);
        if (isInWishlist(productId)) {
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
            if (!loggedIn) {
                addWishlistItem(productId);
                showNotification("wishlist", "Added successfully")
            }
            else {
                if (await addWishlistItem(productId, userData._id)) {
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
        if (clickedButton) return console.log("Button already clicked");
        if (product.hidden) return console.log("Product is unavailable"), showNotification("cart", "Product is unavailable", 1);
        if (product.countInStock < 1) return showNotification("cart", "Product is not in Stock", 1)
        if (!loggedIn) return showNotification("cart", "You are not logged in", 1);
        setClickedButton(true);
        if (isInCart(productId)) {
            if (await removeCartItem(productId, userData._id)) {
                showNotification("cart", "Removed successfully")
            }
            else {
                console.log("Failed to remove item from cart");
                showNotification("cart", "Failed to remove item from cart", 1)
            }
        }
        else {
            if (await addCartItem({ productId, productCount }, userData._id)) {
                showNotification("cart", "Added successfully")
            }
            else {
                showNotification("cart", "Failed to add item from cart", 1)
            }
        }
        setClickedButton(false);
    }

    const handleCounterChange = (e) => {
        if (e.target.value > product.countInStock) e.target.value = product.countInStock
        setProductCount(e.target.value);

    }

    const handleProductDelete = async (productId) => {
        if (!userData?.admin) return showNotification("delete product", "You are not admin to delete products", 1);
        if (clickedButton) return console.log("Button already clicked");
        setClickedButton(true);
        try {
            const response = await deleteProduct(productId)
            if (response.status === 200) {
                showNotification("delete product", "Product successfully deleted");
                setTimeout(() => {
                    window.location.href = "/shop";
                }, 1000)
            }
            else if (res.status === 204) {
                showNotification("delete product", "Nothing to delete");
            }
            else {
                showNotification("delete product", "Failed to delete product", 1);
            }
        } catch (error) {
            console.error(error);
            showNotification("delete product", "Failed to delete product", 1);
        }
        setClickedButton(false);
    }

    return (
        <>
            <RouterPath />

            {showEditModal && (
                <EditProductModal
                    product={product}
                    onClose={() => setShowEditModal(false)}
                    onSave={(updatedProduct) => {
                        setProduct(updatedProduct);
                        setShowEditModal(false);
                    }}
                />
            )}
            <div className="single-product-page">
                {product && product.hidden && userData?.admin === false ?
                    (<div className='single-product-page__unavailable'>
                        <h1>Product Unavailable</h1>
                    </div>)
                    : null

                }

                {product === null ? (
                    <p className='single-product-page__not-found'>Loading...</p>
                ) : product === false ? (
                    <p className='single-product-page__not-found'>No product found</p>
                ) : (
                    <div className={`single-product-page__bottom ${userData?.admin === false && product.hidden ? 'hidden-product' : ''}`}>
                        <div className='single-product-page__bottom__image'>
                            <img src={product.image["medium"]} alt="Product" />
                        </div>
                        <div className='single-product-page__bottom__details'>
                            <div className='single-product-page__bottom__details__title'>
                                <h2>
                                    {product?.title[i18n.language]}
                                    {product?.hidden && <span className="single-product-page__bottom__details__title__hidden-product-label">[Unavailable]</span>}
                                    {userData?.admin && product?.countInStock === 0 && (
                                        <span className='single-product-page__bottom__details__title__out-of-stock'>(Out of Stock)</span>
                                    )}
                                    {userData?.admin && (
                                        <>
                                            <span
                                                className="single-product-page__bottom__details__title__edit-product-btn"
                                                onClick={() => setShowEditModal(true)}
                                            >
                                                Edit <i className="fa-solid fa-pen"></i>
                                            </span>
                                            <span
                                                className="single-product-page__bottom__details__title__del-product-btn"
                                                onClick={() => handleProductDelete(product._id)}
                                            >
                                                Delete <i className="fa-solid fa-trash"></i>
                                            </span>
                                        </>)}
                                </h2>

                                {userData?.admin && (
                                    <div className='single-product-page__bottom__details__title__adm-id'>
                                        ID: <span>{product._id}</span>
                                        <CopyToClipboard text={product._id}>
                                            <span>
                                                <i className="fa-solid fa-copy single-product-page__bottom__details__title__adm-id__copy"></i>
                                            </span>
                                        </CopyToClipboard>
                                    </div>
                                )}
                            </div>

                            <h1 className='single-product-page__bottom__details__price'>
                                {choosedCurrency === "usd" ? "$" : "₾"}{product.price[choosedCurrency].toFixed(2)}
                            </h1>
                            <div className='single-product-page__bottom__details__stars'>
                                {Array.from({ length: product.stars }).map((_, i) => (
                                    <i key={i} className="fa-solid fa-star"></i>
                                ))}
                            </div>
                            <p className='single-product-page__bottom__details__description'>
                                {product.description[i18n.language]}
                            </p>
                            <div className='single-product-page__bottom__details__buttons'>
                                <input
                                    type="number"
                                    className='single-product-page__bottom__details__buttons__quantity'
                                    value={productCount}
                                    // defaultValue={product.countInStock === 0 ? 0 : 1}
                                    min={product.countInStock === 0 ? 0 : 1}
                                    max={product.countInStock}
                                    onChange={handleCounterChange}
                                />
                                <button className='single-product-page__bottom__details__buttons__add-to-cart' onClick={() => toggleCart(product._id)}>
                                    {isInCart(product._id) ? "Remove from Cart" : "Add to Cart"}
                                </button>
                                <button className='single-product-page__bottom__details__buttons__add-to-wishlist' onClick={() => toggleWishlist(product._id)}>
                                    <i className={`fa-solid fa-heart ${isInWishlist(product._id) ? 'active' : ''}`}></i>
                                </button>
                            </div>
                            <Shipping style="1" />
                            <div className='single-product-page__bottom__details__info'>
                                <div className='single-product-page__bottom__details__info__item'>
                                    <span>SKU:</span>
                                    <ul>
                                        <li>Ch-256xl</li>
                                    </ul>
                                </div>
                                <div className='single-product-page__bottom__details__info__item'>
                                    <span>Category:</span>
                                    <ul>
                                        <li>{product.category.name}</li>
                                    </ul>
                                </div>
                                <div className='single-product-page__bottom__details__info__item'>
                                    <span>Tags:</span>
                                    <ul>
                                        <li>{product.featured === true ? "Featured" : "-"}</li>
                                    </ul>
                                </div>
                                <div className='single-product-page__bottom__details__info__item'>
                                    <span>Share:</span>
                                    <ul>
                                        <li><i className="fa-brands fa-facebook-f"></i></li>
                                        <li><i className="fa-brands fa-pinterest-p"></i></li>
                                        <li><i className="fa-brands fa-twitter"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SingleProductPage;
