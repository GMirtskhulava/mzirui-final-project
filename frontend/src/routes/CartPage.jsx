import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Link } from 'react-router-dom'
import { RouterPath, SkeletonLoading } from '../components/index.js'

import { useUserData, useProductsData, useCartData, useNotification, useCurrencyData } from '../context/index.js';
import { useTranslation } from 'react-i18next';


function CartPage() {
    const { loggedIn, userData } = useUserData();
    const { productsData } = useProductsData();
    const { isInCart, cartData, addCartItem, removeCartItem } = useCartData();
    const { showNotification } = useNotification();
    const { choosedCurrency } = useCurrencyData();
    const { i18n } = useTranslation();

    const [cartProducts, setCartProducts] = useState();
    const [clickedButton, setClickedButton] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

    

    useEffect(() => {
        if(!productsData || !cartData) return;

        const matchedProducts = productsData.filter(product =>
            !product.hidden && cartData.some(cartItem => cartItem.productId === product._id)
        );
        setCartProducts(matchedProducts || []);

        let total = 0;
        cartData.forEach(cartItem => {
            const product = productsData.find(p => p._id === cartItem.productId);
            if(product && !product.hidden) {
                total += product.price[choosedCurrency] * cartItem.productCount;
            }
        });

        setTotalCost(total);
    }, [cartData, productsData, loggedIn, userData]);



    const removeFromCart = async (productId) => {
        if(clickedButton) return console.log("Button already clicked");
        if(!isInCart(productId)) return console.log("Not in cart");
        if(!loggedIn) return showNotification("cart", "You are not logged in", 1);
        else {
            setClickedButton(true);
            if(await removeCartItem(productId, userData._id)) {
                showNotification("cart", "Removed successfully");
            }
            else {
                showNotification("cart", "Failed to remove item from cart", 1);
            }
        }
        setClickedButton(false);
    }
    const handleCounterChange = async (e, product) => {
        if(clickedButton === true) return;
        const newCount = parseInt(e.target.value);
        if(isNaN(newCount) || newCount < 1) return;
        const productId = product._id;
        const cartItem = cartData.find(item => item.productId === productId);
        if(!cartItem || newCount === cartItem.productCount) return;
        if(newCount > product.countInStock) return;

        setClickedButton(true)
        try {
            if(await addCartItem({ productId, productCount: newCount }, userData._id)) {
                showNotification("cart", "Quantity updated");
            }
            else {
                showNotification("cart", "Failed to update quantity", 1);
            }
        } catch(error) {
            console.error(error);
            showNotification("cart", "Failed to update quantity", 1);
        }
        setClickedButton(false);
    };

    return (
        <>
            <RouterPath />
            <div className='cart-page'>
                <div className='cart-page__table'>
                    <table>
                        <thead className='cart-page__table__head'>
                            <tr>
                                <th className='cart-page__table__head__remove'>Remove</th>
                                <th className='cart-page__table__head__image'>Image</th>
                                <th className='cart-page__table__head__product'>Product</th>
                                <th className='cart-page__table__head__unit-price'>Unit Price</th>
                                <th className='cart-page__table__head__quantity'>Quantity</th>
                                <th className='cart-page__table__head__total'>Total</th>
                            </tr>
                        </thead>
                        <tbody className='cart-page__table__body'>
                            {
                                cartProducts === undefined ? (
                                    <tr>
                                        <td className='cart-page__table__body__remove'>
                                            <SkeletonLoading width='100%' height='50px' />
                                        </td>
                                        <td>
                                            <SkeletonLoading width='100%' height='8rem' />
                                        </td>
                                        <td className='cart-page__table__body__product'>
                                            <SkeletonLoading width='100%' height='2rem' />
                                        </td>
                                        <td className='cart-page__table__body__unit-price'>
                                            <SkeletonLoading width='100%' height='2rem' />
                                        </td>
                                        <td className='cart-page__table__body__quantity'>
                                            <SkeletonLoading width='100%' height='2rem' />
                                        </td>
                                        <td className='cart-page__table__body__total'>
                                            <SkeletonLoading width='100%' height='4rem' />
                                        </td>
                                    </tr>
                                ) : cartProducts && cartProducts.length === 0 ? (
                                    <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>Products not Found</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                ) : cartProducts.map((product) => (
                                    <tr key={product._id} className={product.hidden ? "hidden-product" : ""}>
                                        <td className='cart-page__table__body__remove'>
                                            <button className='cart-page__table__body__remove__btn' disabled={product.hidden} onClick={() => removeFromCart(product._id)}><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                        <td className='cart-page__table__body__image'>
                                            <Link to={product.hidden ? '' : `/product/${product._id}`} ><img src={product.image["small"]} alt="Product" /></Link>
                                        </td>
                                        <td className='cart-page__table__body__product'>
                                            <Link to={product.hidden ? '' : `/product/${product._id}`} >{product.title[i18n.language]}</Link>
                                            {product.hidden && <span className="hidden-product-label">[Unavailable]</span>}
                                            {userData?.admin ? <p className='cart-page__table__body__product__adm-id'>ID: <span>{product._id.toString()}</span> <CopyToClipboard text={product._id}><span><i className="fa-solid fa-copy cart-page__table__body__product__adm-id__copy"></i></span></CopyToClipboard></p> : <></>}
                                        </td>
                                        <td className='cart-page__table__body__unit-price'>
                                            {choosedCurrency === "usd" ? "$" : "₾"}{product.hidden ? '-' : product.price[choosedCurrency].toFixed(2)}
                                        </td>
                                        <td className={`cart-page__table__body__quantity ${product.hidden ? '' : product.countInStock > 0 ? '' : 'out-of-stock'}`}>
                                            <input
                                                type="number"
                                                className='cart-page__table__body__quantity__input'
                                                value={cartData.find(cartItem => cartItem.productId === product._id)?.productCount || 0}
                                                min={product.countInStock === 0 ? 0 : 1}
                                                max={product.countInStock}
                                                onChange={(e) => handleCounterChange(e, product)}
                                            />
                                        </td>
                                        <td className='cart-page__table__body__total'>
                                            {choosedCurrency === "usd" ? "$" : "₾"}{product.hidden ? '-' : (product.price[choosedCurrency] * (cartData?.find(cartItem => cartItem.productId === product._id)?.productCount || 0)).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <div className='cart-page__footer'>
                    <h2 className='cart-page__footer__title'>Cart total</h2>
                    <p className='cart-page__footer__total'>Total <span>{choosedCurrency === "usd" ? "$" : "₾"}{totalCost.toFixed(2)}</span></p>
                    <Link className='cart-page__footer__button' to="/checkout">Process to Checkout</Link>
                </div>
            </div>
        </>
    )
}

export default CartPage