import { useEffect, useState } from 'react';

import ProductCard from '../ProductCard';

import { useProductsData } from '../../context/ProductsContext';

import { SkeletonLoading, ProductList } from '../index.js';

function OurProduct({ t }) {
    const { productsData } = useProductsData();
    const [activeFilter, setActiveFilter] = useState('featured');
    const [filteredProducts, setFilteredProducts] = useState();

    useEffect(() => {
        if (productsData === undefined || productsData.length === 0) return;
        if (activeFilter === 'latest') {
            setFilteredProducts(
                productsData?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );
        } else {
            setFilteredProducts(
                productsData?.slice().filter((product) => product.featured === true)
            );
        }
    }, [productsData, activeFilter]);

    return (
        <div className="ourProduct-section">
            <div className="ourProduct-box">
                <div className="ourProduct-box__header">
                    <h2>{t('homePage.ourProduct.title')}</h2>
                    <div className="ourProduct-box__header__filter-section">
                        <button
                            className={activeFilter === 'featured' ? 'active' : ''}
                            onClick={() => setActiveFilter('featured')}
                        >
                            {t('homePage.ourProduct.featured')}
                        </button>
                        <button
                            className={activeFilter === 'latest' ? 'active' : ''}
                            onClick={() => setActiveFilter('latest')}
                        >
                            {t('homePage.ourProduct.latest')}
                        </button>
                    </div>
                </div>
                <div className="ourProduct-box__content">
                    <ProductList
                        filteredProducts={filteredProducts}
                        maxProductsPerPage="9"
                    />
                    {/* {
                        !filteredProducts ? (
                            <div className="productCard productCard">
                                <div className="productCard__image no-hover">
                                    <SkeletonLoading height="200px" width="15rem" style={{ marginBottom: '20px' }} />
                                </div>
                                <div className="productCard__content">
                                    <SkeletonLoading height="15px" width="15rem" />

                                    <div className="productCard__content__price">
                                        <SkeletonLoading height="12px" width="15rem" />
                                    </div>
                                    <div className="productCard__content__stars">
                                        <SkeletonLoading height="20px" width="15rem" />
                                    </div>
                                </div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="error">{t("productsNotFound")}</div>
                        ) :
                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    title={product.title}
                                    price={product.price}
                                    stars={product.stars}
                                    imgSrc={product.image}
                                />
                            ))
                    } */}
                    {/* <ProductCard id="123" title="American Cactus" price="9.99" stars="5" imgSrc="https://htmldemo.net/pronia/pronia/assets/images/product/medium-size/1-2-270x300.jpg" /> */}
                </div>
            </div>
        </div>
    );
}

export default OurProduct;
