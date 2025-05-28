import { Link } from 'react-router-dom';

import logo from '../assets/images/icon.png';
import paymentMethods from '../assets/images/payment-methods.png';

// 
import { useTranslation } from 'react-i18next';

//
function Footer() {
    const { t } = useTranslation();
    return (
        <footer>
            <div className="footer-main">
                <div className="footer-main__column">
                    <div className="footer-main__column__logo">
                        <img
                            src={logo}
                            alt=""
                        />
                    </div>
                    <div className="footer-main__column__desc">
                        Lorem ipsum dolor sit amet, consec adipisl elit, sed do eiusmod tempor
                        incidio ut labore et dolore magna.
                    </div>
                    <div className="footer-main__column__urls">
                        <ul>
                            <li>
                                <Link to="https://facebook.com">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="https://twitter.com">
                                    <i className="fa-brands fa-twitter"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="https://youtube.com">
                                    <i className="fa-brands fa-youtube"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to="https://pinterest.com">
                                    <i className="fa-brands fa-pinterest"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-main__column">
                    <h3 className="footer-main__column__title">{t("footer.usefulLinksTitle")}</h3>
                    <ul className="footer-main__column__links">
                        <li>
                            <Link to="/about">{t("aboutPageTitle")}</Link>
                        </li>
                        <li>
                            <Link to="/shop">{t("footer.howToShop")}</Link>
                        </li>
                        <li>
                            <Link to="/faq">F.A.Q</Link>
                        </li>
                        <li>
                            <Link to="/contact">{t("contactPageTitle")}</Link>
                        </li>
                        <li>
                            <Link to="/login">{t("signIn")}</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-main__column">
                    <h3 className="footer-main__column__title">{t("myAccount")}</h3>
                    <ul className="footer-main__column__links">
                        <li>
                            <Link to="/login">{t("signIn")}</Link>
                        </li>
                        <li>
                            <Link to="/cart">{t("viewCart")}</Link>
                        </li>
                        <li>
                            <Link to="/whishlist">{t("myWishlist")}</Link>
                        </li>
                        <li>
                            <Link to="/profile">{t("trackOrder")}</Link>
                        </li>
                        <li>
                            <Link to="/help">{t("footer.help")}</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-main__column">
                    <h3 className="footer-main__column__title">{t("footer.ourServices")}</h3>
                    <ul className="footer-main__column__links">
                        <li>
                            <Link to="/profile">{t("footer.paymentMethods")}</Link>
                        </li>
                        <li>
                            <Link to="/profile">{t("footer.moneyGuarantee")}</Link>
                        </li>
                        <li>
                            <Link to="/profile">{t("footer.returns")}</Link>
                        </li>
                        <li>
                            <Link to="/profile">{t("footer.shipping")}</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy">{t("footer.privacyPolicy")}</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-main__column">
                    <h3 className="footer-main__column__title modern">{t("footer.gotQuestion")}</h3>
                    <Link
                        to="tel://123-456-789"
                        className="footer-main__column__addon-link"
                    >
                        123 456 789
                    </Link>

                    <div className="footer-main__column__addon-desc">Your Adress Goes here</div>
                    <div className="footer-main__column__image">
                        <Link to="/payment-methods">
                            <img
                                src={paymentMethods}
                                alt="payment methods"
                            ></img>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>
                    © 2021 Pronia Made with <i className="fa-solid fa-heart"></i> by HasThemes
                </p>
            </div>
        </footer>
    );
}

export default Footer;
