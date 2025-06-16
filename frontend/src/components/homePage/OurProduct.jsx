import { useEffect, useState } from 'react';


import { useProductsData } from '../../context/index.js';

import { ProductList } from '../index.js';

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
                </div>
            </div>
        </div>
    );
}

export default OurProduct;
