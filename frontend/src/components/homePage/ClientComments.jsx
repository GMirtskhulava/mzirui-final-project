import { useState } from 'react';

import UserImage1 from '../../assets/images/user-image1.png';
import UserImage2 from '../../assets/images/user-image3.png';
import UserImage3 from '../../assets/images/user-image2.png';



function ClientComments({ t }) {
    const commentsData = [
        {
            name: 'PHOENIX BAKER',
            role: t("homePage.clientComments.clientRole"),
            comment:
                'Lorem ipsum dolor sit amet, conse adipisic elit, sed do eiusmod tempo incididunt ut labore et dolore.',
            image: UserImage1,
        },
        {
            name: 'JEMALIKO 123',
            role: t("homePage.clientComments.clientRole"),
            comment:
                'Lorem ipsum dolor sit amet, conse adipisic elit, sed do eiusmod tempo incididunt ut labore et dolore.',
            image: UserImage2,
        },
        {
            name: 'BADRI 001',
            role: t("homePage.clientComments.clientRole"),
            comment:
                'Lorem ipsum dolor sit amet, conse adipisic elit, sed do eiusmod tempo incididunt ut labore et dolore.',
            image: UserImage3,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const infinity_comments = [...commentsData, ...commentsData, ...commentsData];
    const baseIndex = commentsData.length + currentIndex;

    return (
        <div className="clientComments-section">
            <div className="clientComments-bg">
                <div className="clientComments-bg__text">
                    <h3 className="clientComments-bg__text__title">{t("homePage.clientComments.title")}</h3>
                    <p className="clientComments-bg__text__desc">
                        {t("homePage.clientComments.description")}
                    </p>
                </div>
            </div>

            <div className="clientComments-cards">
                <div className="carousel-wrapper">
                    <div
                        className="carousel-track"
                        style={{
                            transform: `translateX(-${baseIndex * (315 + 32)}px)`, // 32 = 2rem (gap)
                        }}
                    >
                        {infinity_comments.map((card, index) => (
                            <div
                                className="clientComments-card"
                                key={index}
                            >
                                <div className="clientComments-card__user">
                                    <div className="clientComments-card__user__image">
                                        <img
                                            src={card.image}
                                            alt={card.name}
                                        />
                                    </div>
                                    <div className="clientComments-card__user__info">
                                        <p className="clientComments-card__user__info__name">
                                            {card.name}
                                        </p>
                                        <p className="clientComments-card__user__info__role">
                                            {card.role}
                                        </p>
                                    </div>
                                </div>
                                <div className="clientComments-card__comment">
                                    <p>{card.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dot Navigation */}
                <div className="clientComments-dots">
                    {commentsData.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClientComments;
