import { useState, useEffect } from 'react';

// imgs
import logo from '../assets/images/icon.png';
//
import { getToken } from '../api/UsersApi';

function Header() {
    const [isLoggined, setIsLoggined] = useState();
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
    });
    return (
        <header className="header-section">
            <div className="header-top-box">
                <div className="header-top-box__greeting-box">
                    HELLO EVERYONE! 25% Off All Products
                </div>
                <div className="header-top-box__language-box">
                    <select>
                        <option>English</option>
                        <option>Georgian</option>
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
                    ) : (
                        <a href="/login">Sign In</a>
                    )}
                </div>
            </div>
            <div className="header-bottom-box">
                <ul>
                    <li>
                        <a href="/">HOME</a>
                    </li>
                    <li>
                        <a href="/shop">SHOP</a>
                    </li>
                    <li>
                        <a href="/blog">BLOG</a>
                    </li>
                    <li>
                        <a href="/about">ABOUT US</a>
                    </li>
                    <li>
                        <a href="/contact">CONTACT US</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
