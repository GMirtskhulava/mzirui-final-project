import { useEffect, useState } from 'react';

import { RouterPath, Shipping } from '../components/index.js';
import i18n from 'i18next';
import { useParams } from 'react-router-dom';
import { useProductsData } from '../context/ProductsContext.jsx';

function SingleProductPage() {
    const { id } = useParams();
    const { productsData } = useProductsData();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!productsData) {
            setProduct(null); 
        } else {
            const found = productsData.find(item => item._id === id);
            setProduct(found || false);
        }
    }, [productsData, id]);


    return (
        <>
            <RouterPath />
            <div className="single-product-page">
                {product === null ? (
                    <p className='single-product-page__not-found'>Loading...</p>
                ) : product === false ? (
                    <p className='single-product-page__not-found'>No product found</p>
                ) : (
                    <div className='single-product-page__bottom'>
                        <div className='single-product-page__bottom__image'>
                            <img src={product.image} alt="Product" />
                        </div>
                        <div className='single-product-page__bottom__details'>
                            <h2 className='single-product-page__bottom__details__title'>
                                {product.title[i18n.language]}
                            </h2>
                            <h1 className='single-product-page__bottom__details__price'>
                                ${product.price}
                            </h1>
                            <div className='single-product-page__bottom__details__stars'>
                                {Array.from({ length: product.stars }).map((_, i) => (
                                    <i key={i} className="fa-solid fa-star"></i>
                                ))}
                            </div>
                            <p className='single-product-page__bottom__details__description'>
                                {product.description[i18n.language]}
                            </p>
                            <div className='single-product-page__bottom__details__buttons'>
                                <input
                                    type="number"
                                    defaultValue="1"
                                    min="1"
                                    max="100"
                                    className='single-product-page__bottom__details__buttons__quantity'
                                />
                                <button className='single-product-page__bottom__details__buttons__add-to-cart'>
                                    Add to Cart
                                </button>
                                <button className='single-product-page__bottom__details__buttons__add-to-wishlist'>
                                    <i className="fa-solid fa-heart"></i>
                                </button>
                            </div>
                            <Shipping style="1" />
                            <div className='single-product-page__bottom__details__info'>
                                <div className='single-product-page__bottom__details__info__item'>
                                    <span>SKU:</span>
                                    <ul>
                                        <li>Ch-256xl</li>
                                    </ul>
                                </div>
                                <div className='single-product-page__bottom__details__info__item'>
                                    <span>Category:</span>
                                    <ul>
                                        <li>{product.category.name}</li>
                                    </ul>
                                </div>
                                <div className='single-product-page__bottom__details__info__item'>
                                    <span>Tags:</span>
                                    <ul>
                                        <li>{product.featured === true ? "Featured" : "-"}</li>
                                    </ul>
                                </div>
                                <div className='single-product-page__bottom__details__info__item'>
                                    <span>Share:</span>
                                    <ul>
                                        <li><i className="fa-brands fa-facebook-f"></i></li>
                                        <li><i className="fa-brands fa-pinterest-p"></i></li>
                                        <li><i className="fa-brands fa-twitter"></i></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SingleProductPage;
