import ProductCard from "../ProductCard";

function OurProduct({ t }) {
    return (
        <div className="ourProduct-section">
            <div className="ourProduct-box">
                <div className="ourProduct-box__header">
                    <h2>{t("homePage.ourProduct.title")}</h2>
                    <div className="ourProduct-box__header__filter-section">
                        <button className="active">{t("homePage.ourProduct.featured")}</button>
                        <button>{t("homePage.ourProduct.bestSeller")}</button>
                        <button>{t("homePage.ourProduct.latest")}</button>
                    </div>
                </div>
                <div className="ourProduct-box__content">
                    <ProductCard id="123" title="American Cactus" price="9.99" stars="5" imgSrc="https://htmldemo.net/pronia/pronia/assets/images/product/medium-size/1-2-270x300.jpg"/>
                </div>
            </div>
        </div>
    );
}

export default OurProduct;
