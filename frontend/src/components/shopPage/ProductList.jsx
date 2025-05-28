import ProductCard from '../ProductCard';
import SkeletonLoading from '../SkeletonLoading';

function ProductList({ filteredProducts }) {
    return (
        <div className="shop-page__product-list">
            <div className="shop-page__product-list__products">
                {!filteredProducts ? (
                    <>
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
                    </>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
                    <div className="error">No products found.</div>
                )}
            </div>
        </div>
    );
}

export default ProductList;
