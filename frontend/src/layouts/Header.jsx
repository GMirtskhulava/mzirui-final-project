import { useState, useEffect } from 'react';

// imgs
import logo from '../assets/images/icon.png';
//
import { getToken } from '../api/UsersApi';

import SkeletonLoading from '../components/SkeletonLoading';
import { useTranslation } from 'react-i18next';

// 

function Header() {
    const [isLoggined, setIsLoggined] = useState();
    const [choosedLanguage, setChoosedLanguage] = useState(localStorage.getItem('lang') || 'en');

    const { t, i18n } = useTranslation();

    useEffect(() => {
        getToken()
            .then((res) => {
                if (res.status === 200) {
                    setIsLoggined(true);
                } else {
                    setIsLoggined(false);
                }
            })
            .catch((err) => {
                console.error(err);
                setIsLoggined(false);
            });
    }, []);
    useEffect(() => {
        i18n.changeLanguage(choosedLanguage);
        localStorage.setItem('lang', choosedLanguage);
    }, [choosedLanguage, i18n]);
    return (
        <header className="header-section">
            <div className="header-top-box">
                <div className="header-top-box__greeting-box">
                    {t("header.sale")}
                </div>
                <div className="header-top-box__select-box">
                    <select onChange={(e) => setChoosedLanguage(e.target.value)} value={choosedLanguage}>
                        <option value="en">{t("header.langEnglish")}</option>
                        <option value="ka">{t("header.langGeorgian")}</option>
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
                    {isLoggined === true ? (
                        <>
                            <a href="/">
                                <i className="fa-solid fa-search"></i>
                            </a>
                            <a href="/profile">
                                <i className="fa-solid fa-user"></i>
                            </a>
                            <a href="/wishlist">
                                <i className="fa-solid fa-heart"></i>
                            </a>
                            <a href="/cart">
                                <i className="fa-solid fa-cart-shopping user-cart-icon">
                                    <span className="user-cart-icon__cart-value">1</span>
                                </i>
                            </a>
                        </>
                    ) : isLoggined === false ? (
                        <a href="/login">{t("signIn")}</a>
                    ) : (
                        <SkeletonLoading width='100px'/>
                    )}
                </div>
            </div>
            <div className="header-bottom-box">
                <ul>
                    <li>
                        <a href="/">{t("homePageTitle")}</a>
                    </li>
                    <li>
                        <a href="/shop">{t("shopPageTitle")}</a>
                    </li>
                    <li>
                        <a href="/blog">{t("blogPageTitle")}</a>
                    </li>
                    <li>
                        <a href="/about">{t("aboutPageTitle")}</a>
                    </li>
                    <li>
                        <a href="/contact">{t("contactPageTitle")}</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
