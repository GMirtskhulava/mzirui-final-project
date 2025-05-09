import React from 'react';

// icons
import shippingCarIcon from '../../assets/images/icons/car.png';
import shippingCardIcon from '../../assets/images/icons/card.png';
import shippingServiceIcon from '../../assets/images/icons/service.png';

function Shipping() {
    return (
        <div className="shipping-section">
            <div className="shipping-container">
                <div className="shipping-card">
                    <div className="shipping-card__icon">
                        <img src={shippingCarIcon}></img>
                    </div>
                    <div className="shipping-card__text">
                        <h2 className="shipping-card__text__title">Free Shipping</h2>
                        <p className="shipping-card__text__desc">Capped at $319 per order</p>
                    </div>
                </div>
                <div className="shipping-card">
                    <div className="shipping-card__icon">
                        <img src={shippingCardIcon}></img>
                    </div>
                    <div className="shipping-card__text">
                        <h2 className="shipping-card__text__title">Safe Payment</h2>
                        <p className="shipping-card__text__desc">With our payment gateway</p>
                    </div>
                </div>
                <div className="shipping-card">
                    <div className="shipping-card__icon">
                        <img src={shippingServiceIcon}></img>
                    </div>
                    <div className="shipping-card__text">
                        <h2 className="shipping-card__text__title">Best Services</h2>
                        <p className="shipping-card__text__desc">Friendly & Supper Services</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shipping;
