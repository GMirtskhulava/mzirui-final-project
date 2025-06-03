import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// imgs
import { logo } from '../assets/index.js';

//

import { SkeletonLoading } from '../components/index.js';

import { useTranslation } from 'react-i18next';
//
import { useUserData } from '../context/UserContext';
import { useWishlistData } from '../context/WishlistContext.jsx';
//

function Header() {
    const [choosedLanguage, setChoosedLanguage] = useState(localStorage.getItem('lang') || 'en');
    const { t, i18n } = useTranslation();
    const { loggedIn } = useUserData();
    const { wishlistData } = useWishlistData();

    // useEffect(() => {
    //     getToken()
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 setIsLoggined(true);
    //             } else {
    //                 setIsLoggined(false);
    //             }
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             setIsLoggined(false);
    //         });
    // }, []);
    useEffect(() => {
        i18n.changeLanguage(choosedLanguage);
        localStorage.setItem('lang', choosedLanguage);
    }, [choosedLanguage, i18n]);
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
                    {loggedIn === true ? (
                        <>
                            <Link to="/">
                                <i className="fa-solid fa-search"></i>
                            </Link>
                            <Link to="/profile">
                                <i className="fa-solid fa-user"></i>
                            </Link>
                            <Link to="/wishlist">
                                <i className="fa-solid fa-heart user-wishlist-icon">
                                    {wishlistData && wishlistData.length > 0 ? (
                                        <span className="user-wishlist-icon__wishlist-value">{wishlistData.length}</span>
                                    ) : <></>}
                                </i>
                            </Link>
                            <Link to="/cart">
                                <i className="fa-solid fa-cart-shopping user-cart-icon">
                                    <span className="user-cart-icon__cart-value">1</span>
                                </i>
                            </Link>
                        </>
                    ) : loggedIn === false ? (
                        <a href="/login">{t('signIn')}</a>
                    ) : (
                        <SkeletonLoading width="100px" />
                    )}
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
                        <Link to="/blog">{t('blogPageTitle')}</Link>
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
