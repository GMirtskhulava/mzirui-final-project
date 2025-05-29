import { useState } from 'react';
import ProductCard from '../ProductCard';
import SkeletonLoading from '../SkeletonLoading';

import { useTranslation } from 'react-i18next';

function ProductList({ filteredProducts }) {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const totalProducts = filteredProducts ? filteredProducts.length : 0;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts ? filteredProducts.slice(startIndex, startIndex + productsPerPage) : null;

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="shop-page__product-list">
            <div className="shop-page__product-list__products">
                {!filteredProducts ? (
                    <>
                        <div className="productCard">
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
                    </>
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            title={product.title.en}
                            price={product.price}
                            stars={product.stars}
                            imgSrc={product.image}
                        />
                    ))
                ) : (
                    <div className="error">{t("productsNotFound")}</div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        &lt; {t("previous")}
                    </button>

                    {[...Array(totalPages)].map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={pageNum === currentPage ? 'active' : ''}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        {t("next")} &gt;
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductList;
