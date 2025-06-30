import { useState, useEffect } from 'react';

import { RouterPath, SkeletonLoading } from '../components/index.js';
import { useUserData, useProductsData, useCartData, useNotification, useCurrencyData } from '../context/index.js';
import { useTranslation } from 'react-i18next';

function CheckoutPage() {
    const { loggedIn, userData } = useUserData();
    const { productsData } = useProductsData();
    const { cartData } = useCartData();
    const { i18n } = useTranslation();
    const { choosedCurrency } = useCurrencyData();

    const [cartProducts, setCartProducts] = useState();
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
    return (
    <>
        <RouterPath />
        <div className="checkout-page">
            <div className="checkout-page__billing">
                <div className="checkout-page__billing__header">
                    <h2 className="checkout-page__billing__header__title">BILLING DETAILS</h2>
                </div>
                <form className="checkout-page__billing__form">
                    <div className="checkout-page__billing__form__input-box__input-box">
                        <label className="checkout-page__billing__form__label">Country *</label>
                        <select className="checkout-page__billing__form__input-box__input">
                            <option>London</option>
                        </select>
                    </div>

                    <div className="checkout-page__billing__form__row">
                        <div className='checkout-page__billing__form__input-box__input-box'>
                            <label>First Name *</label>
                            <input type="text" placeholder="First Name" className="checkout-page__billing__form__input-box__input" />
                        </div>
                        <div className='checkout-page__billing__form__input-box__input-box'>
                            <label>Last Name*</label>
                            <input type="text" placeholder="Last Name" className="checkout-page__billing__form__input-box__input" />
                        </div>
                    </div>

                    <div className='checkout-page__billing__form__input-box__input-box'>
                        <label>Company Name</label>
                        <input type="text" placeholder="Company Name" className="checkout-page__billing__form__input-box__input" />
                    </div>

                    <div className='checkout-page__billing__form__input-box__input-box'>
                        <label>Adress *</label>
                        <input type="text" placeholder="Street address *" className="checkout-page__billing__form__input-box__input" />
                    </div>
                    <div className='checkout-page__billing__form__input-box__input-box'>
                        <input type="text" placeholder="Apartment, suite, unit etc. (optional)" className="checkout-page__billing__form__input-box__input" />
                    </div>
                    <div className='checkout-page__billing__form__input-box__input-box'>
                        <label>Town / City *</label>
                        <input type="text" placeholder="Town / City *" className="checkout-page__billing__form__input-box__input" />
                    </div>

                    <div className="checkout-page__billing__form__row">
                        <div className='checkout-page__billing__form__input-box__input-box'>
                            <label>State / County *</label>
                            <input type="text" placeholder="State / County *" className="checkout-page__billing__form__input-box__input" />
                        </div>
                        <div className='checkout-page__billing__form__input-box__input-box'>
                            <label>Postcode / Zip *</label>
                            <input type="text" placeholder="Postcode / Zip *" className="checkout-page__billing__form__input-box__input" />
                        </div>
                    </div>
                    <div className="checkout-page__billing__form__row">
                        <div className='checkout-page__billing__form__input-box__input-box'>
                            <label>Email Adress *</label>
                            <input type="email" placeholder="Email Address *" className="checkout-page__billing__form__input-box__input" />
                        </div>
                        <div className='checkout-page__billing__form__input-box__input-box'>
                            <label>Phone *</label>
                            <input type="tel" placeholder="Phone *" className="checkout-page__billing__form__input-box__input" />
                        </div>
                    </div>
                </form>
            </div>

            <div className="checkout-page__order">
                <div className="checkout-page__order__order-box">
                    <h2 className="checkout-page__order__order-box__title">YOUR ORDER</h2>
                    {
                        cartProducts === undefined ? (
                            <SkeletonLoading width='100%' height='50px' />
                        ) : cartProducts && cartProducts.length === 0 ? (
                            <p>No product found in cart</p>
                        ) : cartProducts.map((product) => (
                            <div className="checkout-page__order__order-box__order-line" key={product._id}>
                                <span>{product.title[i18n.language]} <span><b>× {cartData.find(cartItem => cartItem.productId === product._id).productCount}</b></span></span>
                                <span>{choosedCurrency === "usd" ? "$" : "₾"}{product.price[choosedCurrency].toFixed(2)}</span>
                            </div>
                        ))
                    }
                    <div className="checkout-page__order__order-box__order-line checkout-page__order__order-box__order-line--total">
                        <span>Order Total</span>
                        <span>{choosedCurrency === "usd" ? "$" : "₾"}{totalCost.toFixed(2)}</span>
                    </div>

                    <div className="checkout-page__order__order-box__payment-info">
                        <p className='checkout-page__order__order-box__payment-info__title'>Direct Bank Transfer</p> 
                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                        <p className='checkout-page__order__order-box__payment-info__title'>Cheque Payment</p>
                        <p className='checkout-page__order__order-box__payment-info__title'>PayPal</p>
                    </div>

                    <button className="checkout-page__order__order-box__button">PLACE ORDER</button>
                </div>
            </div>
        </div>
    </>
    );
}

export default CheckoutPage;
