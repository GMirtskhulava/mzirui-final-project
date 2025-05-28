import React from 'react';

import { useTranslation } from 'react-i18next';


// icons
import shippingCarIcon from '../../assets/images/icons/car.png';
import shippingCardIcon from '../../assets/images/icons/card.png';
import shippingServiceIcon from '../../assets/images/icons/service.png';

function Shipping() {
    const { t } = useTranslation();

    return (
        <div className="shipping-section">
            <div className="shipping-container">
                <div className="shipping-card">
                    <div className="shipping-card__icon">
                        <img src={shippingCarIcon}></img>
                    </div>
                    <div className="shipping-card__text">
                        <h2 className="shipping-card__text__title">{t("shipping.freeShipping")}</h2>
                        <p className="shipping-card__text__desc">{t("shipping.freeShippingDescription")}</p>
                    </div>
                </div>
                <div className="shipping-card">
                    <div className="shipping-card__icon">
                        <img src={shippingCardIcon}></img>
                    </div>
                    <div className="shipping-card__text">
                        <h2 className="shipping-card__text__title">{t("shipping.safePayment")}</h2>
                        <p className="shipping-card__text__desc">{t("shipping.safePaymentDescription")}</p>
                    </div>
                </div>
                <div className="shipping-card">
                    <div className="shipping-card__icon">
                        <img src={shippingServiceIcon}></img>
                    </div>
                    <div className="shipping-card__text">
                        <h2 className="shipping-card__text__title">{t("shipping.bestServices")}</h2>
                        <p className="shipping-card__text__desc">{t("shipping.bestServicesDescription")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shipping;
