import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// imgs
import { logo } from '../assets/index.js';

//
import { SkeletonLoading } from '../components/index.js';

import { useTranslation } from 'react-i18next';
//

import { useWishlistData, useUserData, useCartData, useProductsData, useCurrencyData } from '../context/index.js';

//

function Header() {
    const { t, i18n } = useTranslation();
    const { loggedIn, userData } = useUserData();
    const { wishlistData } = useWishlistData();
    const { cartData } = useCartData();
    const { productsData } = useProductsData();
    const { choosedCurrency , setChoosedCurrency } = useCurrencyData();
    const [choosedLanguage, setChoosedLanguage] = useState(localStorage.getItem('lang') || 'en');
    const [cartItemsLength, setCartItemsLength] = useState(0);
    
    useEffect(() => {
        i18n.changeLanguage(choosedLanguage);
        localStorage.setItem('lang', choosedLanguage);
    }, [choosedLanguage, i18n]);
    
    useEffect(() => {
        localStorage.setItem('curr', choosedCurrency);
    }, [choosedCurrency])

    useEffect(() => {
        setCartItemsLength((cartData && productsData ? cartData.filter(cartItem => {
                const product = productsData.find(p => p._id === cartItem.productId);
                return product && !product.hidden;
            }) : [] ).length)
    }, [productsData, cartData])
    return (
        <header className="header-section">
            <div className="header-top-box">
                <div className="header-top-box__greeting-box">{t('header.sale')}</div>
                <div className="header-top-box__select-box">
                    <select
                        onChange={(e) => setChoosedLanguage(e.target.value)}
                        value={choosedLanguage}
                    >
                        <option value="en">{t('header.langEnglish')}</option>
                        <option value="ka">{t('header.langGeorgian')}</option>
                    </select>
                </div>
                <div className="header-top-box__select-box">
                    <select
                        onChange={(e) => setChoosedCurrency(e.target.value)}
                        value={choosedCurrency}
                    >
                        <option value="usd">$ [USD]</option>
                        <option value="gel">₾ [GEL]</option>
                    </select>
                </div>
            </div>
            <div className="header-center-box">
                <div className="header-center-box__contact-box">
                    <div className="header-center-box__contact-box__phone-icon">
                        <i className="fa-solid fa-phone"></i>
                    </div>
                    <a href="tel:+0012341234">+995 555 555 555</a>
                </div>
                <div className="header-center-box__logo-box">
                    <a href="/">
                        <img src={logo}></img>
                    </a>
                </div>
                <div className="header-center-box__settings-box">
                    
                        <>
                            <Link to="/">
                                <i className="fa-solid fa-search"></i>
                            </Link>
                            {loggedIn === true ? (
                                <Link to={`/profile/${userData._id}`}>
                                    <i className="fa-solid fa-user"></i>
                                </Link>
                            ) : loggedIn === false ? (
                                <Link to="/login">{t('signIn')}</Link>
                            ) : (
                                <SkeletonLoading width="100px" />
                            )}
                            <Link to="/wishlist">
                                <i className="fa-solid fa-heart user-wishlist-icon">
                                    {wishlistData && wishlistData.length > 0 ? (
                                        <span className="user-wishlist-icon__wishlist-value">{wishlistData.length}</span>
                                    ) : <></>}
                                </i>
                            </Link>
                            {loggedIn === true ? (
                                <Link to="/cart">
                                    <i className="fa-solid fa-cart-shopping user-cart-icon">
                                    {cartItemsLength > 0 ? (
                                        <span className="user-cart-icon__cart-value">{cartItemsLength}</span>
                                    ) : <></>}
                                    </i>
                                </Link>
                            ) : loggedIn === false ? (
                                <></>
                            ) : (
                                <SkeletonLoading width="10px" />
                            )}

                        </>

                </div>
            </div>
            <div className="header-bottom-box">
                <ul>
                    <li>
                        <Link to="/">{t('homePageTitle')}</Link>
                    </li>
                    <li>
                        <Link to="/shop">{t('shopPageTitle')}</Link>
                    </li>
                    <li>
                        <Link to="/about">{t('aboutPageTitle')}</Link>
                    </li>
                    <li>
                        <Link to="/contact">{t('contactPageTitle')}</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
