import React from 'react'

function ProductCard({ id, title, price, stars, imgSrc }) {
    return (
        <div className="productCard">
            <div className="productCard__image">
                <a
                    className="view-button"
                    href={`product/${id}`}

                >
                    VIEW
                </a>
                <a href="product/1">
                    <img src={imgSrc}></img>
                </a>
            </div>
            <div className="productCard__content">
                <a
                    className="productCard__content__title"
                    href={`product/${id}`}
                >
                    {title}
                </a>
                <p className="productCard__content__price">${price}</p>
                <div className="productCard__content__stars">
                    {Array.from({ length: stars }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductCard