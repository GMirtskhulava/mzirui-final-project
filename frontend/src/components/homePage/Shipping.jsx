import { useTranslation } from 'react-i18next';

// icons
import { shippingCarIcon, shippingCardIcon, shippingServiceIcon } from '../../assets/index.js';

function Shipping({ style = 0 }) {
    const { t } = useTranslation();

    return (
        style == 1 ? (
            <div className="shipping-section--smaller">
                <div className="shipping-container">
                    <div className="shipping-card">
                        <div className="shipping-card__icon">
                            <img src={shippingCarIcon}></img>
                        </div>
                        <div className="shipping-card__text">
                            <h2 className="shipping-card__text__title">{t('shipping.freeShipping')}</h2>
                        </div>
                    </div>
                    <div className="shipping-card">
                        <div className="shipping-card__icon">
                            <img src={shippingCardIcon}></img>
                        </div>
                        <div className="shipping-card__text">
                            <h2 className="shipping-card__text__title">{t('shipping.safePayment')}</h2>
                        </div>
                    </div>
                    <div className="shipping-card">
                        <div className="shipping-card__icon">
                            <img src={shippingServiceIcon}></img>
                        </div>
                        <div className="shipping-card__text">
                            <h2 className="shipping-card__text__title">{t('shipping.bestServices')}</h2>
                        </div>
                    </div>
                </div>
            </div>

        ) : (
            <div className="shipping-section">
                <div className="shipping-container">
                    <div className="shipping-card">
                        <div className="shipping-card__icon">
                            <img src={shippingCarIcon}></img>
                        </div>
                        <div className="shipping-card__text">
                            <h2 className="shipping-card__text__title">{t('shipping.freeShipping')}</h2>
                            <p className="shipping-card__text__desc">
                                {t('shipping.freeShippingDescription')}
                            </p>
                        </div>
                    </div>
                    <div className="shipping-card">
                        <div className="shipping-card__icon">
                            <img src={shippingCardIcon}></img>
                        </div>
                        <div className="shipping-card__text">
                            <h2 className="shipping-card__text__title">{t('shipping.safePayment')}</h2>
                            <p className="shipping-card__text__desc">
                                {t('shipping.safePaymentDescription')}
                            </p>
                        </div>
                    </div>
                    <div className="shipping-card">
                        <div className="shipping-card__icon">
                            <img src={shippingServiceIcon}></img>
                        </div>
                        <div className="shipping-card__text">
                            <h2 className="shipping-card__text__title">{t('shipping.bestServices')}</h2>
                            <p className="shipping-card__text__desc">
                                {t('shipping.bestServicesDescription')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Shipping;
