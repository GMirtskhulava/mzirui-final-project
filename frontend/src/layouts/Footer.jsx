import React from 'react'
import { Link } from 'react-router-dom';

import logo from "../assets/images/icon.png";
import paymentMethods from "../assets/images/payment-methods.png";

function Footer() {
    return (
    <footer>
        <div className='footer-main'>
            <div className='footer-main__column'>
                <div className='footer-main__column__logo'>
                    <img src={logo} alt="" />
                </div>
                <div className='footer-main__column__desc'>
                    Lorem ipsum dolor sit amet, consec adipisl elit, sed do eiusmod tempor incidio ut labore et dolore magna.
                </div>
                <div className='footer-main__column__urls'>
                    <ul>
                        <li><Link to="https://facebook.com"><i class="fa-brands fa-facebook-f"></i></Link></li>
                        <li><Link to="https://twitter.com"><i class="fa-brands fa-twitter"></i></Link></li>
                        <li><Link to="https://youtube.com"><i class="fa-brands fa-youtube"></i></Link></li>
                        <li><Link to="https://pinterest.com"><i class="fa-brands fa-pinterest"></i></Link></li>
                    </ul>
                </div>
            </div>
            <div className='footer-main__column'>
                <h3 className='footer-main__column__title'>Useful Links</h3>
                <ul className='footer-main__column__links'>
                    <li><Link to="/about">About Pronia</Link></li>
                    <li><Link to="/shop">How to Shop</Link></li>
                    <li><Link to="/faq">F.A.Q</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </ul>
            </div>
            <div className='footer-main__column'>
                <h3 className='footer-main__column__title'>My Account</h3>
                <ul className='footer-main__column__links'>
                    <li><Link to="/login">Sign In</Link></li>
                    <li><Link to="/cart">View Cart</Link></li>
                    <li><Link to="/whishlist">My Whishlist</Link></li>
                    <li><Link to="/profile">Track My Order</Link></li>
                    <li><Link to="/help">Help</Link></li>
                </ul>
            </div>
            <div className='footer-main__column'>
                <h3 className='footer-main__column__title'>Our Service</h3>
                <ul className='footer-main__column__links'>
                    <li><Link to="/profile">Payment Methods</Link></li>
                    <li><Link to="/profile">Money Guarantee!</Link></li>
                    <li><Link to="/profile">Returns</Link></li>
                    <li><Link to="/profile">Shipping</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                </ul>
            </div>
            <div className='footer-main__column'>
                <h3 className='footer-main__column__title modern'>Got Question? Call Us</h3>
                <Link to="tel://123-456-789" className='footer-main__column__addon-link'>123 456 789</Link>

                <div className='footer-main__column__addon-desc'>
                    Your Adress Goes here
                </div>
                <div className='footer-main__column__image'>
                    <Link to="/payment-methods">
                        <img src={paymentMethods} alt='payment methods'></img>
                    </Link>
                </div>
            </div>
        </div>
        <div className='footer-bottom'>
            <p>© 2021 Pronia Made with <i class="fa-solid fa-heart"></i> by HasThemes</p>
        </div>
    </footer>
    )
}

export default Footer