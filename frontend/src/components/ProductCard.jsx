import React from 'react';
import { Link } from 'react-router-dom';
import i18n from 'i18next';

function ProductCard({ id, title, price, stars, imgSrc }) {
    return (
        <div className="productCard">
            <div className="productCard__image">
                <Link
                    to={`/product/${id}`}
                    className="productCard__image__link"
                >
                    <img src={imgSrc} />
                </Link>
                <div className="productCard__image__buttons productCard-image-hover">
                    <button>
                        <i className="fa-solid fa-heart"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-eye"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </div>

            <div className="productCard__content">
                <Link
                    className="productCard__content__title"
                    to={`/product/${id}`}
                >
                    {title[i18n.language]}
                </Link>
                <p className="productCard__content__price">${price}</p>
                <div className="productCard__content__stars">
                    {Array.from({ length: stars }).map((_, i) => (
                        <i
                            key={i}
                            className="fa-solid fa-star"
                        ></i>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
