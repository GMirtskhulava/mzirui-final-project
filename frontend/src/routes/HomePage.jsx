import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import Slider from '../components/homePage/Slider';
import Shipping from '../components/homePage/Shipping';
import OurProduct from '../components/homePage/OurProduct';
import ClientComments from '../components/homePage/ClientComments';
import Brands from '../components/homePage/Brands';

// 
import CollectionBanner1 from '../assets/images/collection-banner-1.png';
import CollectionBanner2 from '../assets/images/collection-banner-2.png';
import CollectionBanner3 from '../assets/images/collection-banner-3.png';
import CollectionBanner4 from '../assets/images/collection-banner-4.png';

import Blog1Image from '../assets/images/blog1-img.png';


function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <Slider t={t}/>
            <Shipping/>
            <OurProduct t={t} />
            {/*  */}
            <div className="collections-section">
                <div className="collection-content">
                    <div className="collection-box">
                        <div className="collection-box__banner">
                            <img
                                src={CollectionBanner1}
                                alt="Banner"
                            />
                        </div>
                        <div className="collection-box__info-rectangle">
                            <p className="collection-box__info__desc">{t("homePage.collections.cactusTitle")}</p>
                            <h3 className="collection-box__info__title">{t("homePage.collections.cactusDesc")}</h3>
                            <button>
                                <Link to="/shop">{t("homePage.collections.shopNow")}</Link>
                            </button>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="collection-box__banner">
                            <img
                                src={CollectionBanner2}
                                alt="Banner"
                            />
                        </div>
                        <div className="collection-box__info-square">
                            <p className="collection-box__info__desc">{t("homePage.collections.newCollectionTitle")}</p>
                            <h3 className="collection-box__info__title">{t("homePage.collections.newCollectionDesc")}</h3>
                            <button>
                                <Link to="/shop">{t("homePage.collections.shopNow")}</Link>
                            </button>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="collection-box__banner">
                            <img
                                src={CollectionBanner3}
                                alt="Banner"
                            />
                        </div>
                        <div className="collection-box__info-square">
                            <p className="collection-box__info__desc">{t("homePage.collections.newCollectionTitle")}</p>
                            <h3 className="collection-box__info__title">{t("homePage.collections.newCollectionDesc")}</h3>
                            <button>
                                <Link to="/shop">{t("homePage.collections.shopNow")}</Link>
                            </button>
                        </div>
                    </div>
                    <div className="collection-box">
                        <div className="collection-box__banner">
                            <img
                                src={CollectionBanner4}
                                alt="Banner"
                            />
                        </div>
                        <div className="collection-box__info-rectangle">
                            <p className="collection-box__info__desc">{t("homePage.collections.cactusTitle")}</p>
                            <h3 className="collection-box__info__title">{t("homePage.collections.cactusDesc")}</h3>
                            <button>
                                <Link to="/shop">{t("homePage.collections.shopNow")}</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <ClientComments t={t}/>
            <Brands />
            {/*  */}
            <div className="latestBlogs-section">
                <div className="latestBlogs-header">
                    <h2 className="latestBlogs-header__title">{t("homePage.latestBlog.title")}</h2>
                    <p className="latestBlogs-header__desc">
                        {t("homePage.latestBlog.description")}
                    </p>
                </div>
                <div className="latestBlogs-blogsArea">
                    <div className="blog-card">
                        <div className="blog-card__content">
                            <p className="blog-card__content__info">{t("homePage.latestBlog.blogDate")}</p>
                            <h2 className="blog-card__content__title">{t("homePage.latestBlog.blogTitle")}</h2>
                            <p className="blog-card__content__desc">
                                Lorem ipsum dolor sit amet, consecteturl adipisl elit, sed do eiusmod
                                tempor incidio ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <Link
                            to="/blog"
                            className="blog-card__image"
                        >
                            <img src={Blog1Image}></img>
                            <div className="blog-card__image__link-box">
                                <i className="fa-solid fa-link"></i>
                            </div>
                        </Link>
                    </div>
                    <div className="blog-card">
                        <div className="blog-card__content">
                            <p className="blog-card__content__info">{t("homePage.latestBlog.blogDate")}</p>
                            <h2 className="blog-card__content__title">{t("homePage.latestBlog.blogTitle")}</h2>
                            <p className="blog-card__content__desc">
                                Lorem ipsum dolor sit amet, consecteturl adipisl elit, sed do eiusmod
                                tempor incidio ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <Link
                            to="/blog"
                            className="blog-card__image"
                        >
                            <img src={Blog1Image}></img>
                            <div className="blog-card__image__link-box">
                                <i className="fa-solid fa-link"></i>
                            </div>
                        </Link>
                    </div>
                    <div className="blog-card">
                        <div className="blog-card__content">
                            <p className="blog-card__content__info">{t("homePage.latestBlog.blogDate")}</p>
                            <h2 className="blog-card__content__title">{t("homePage.latestBlog.blogTitle")}</h2>
                            <p className="blog-card__content__desc">
                                Lorem ipsum dolor sit amet, consecteturl adipisl elit, sed do eiusmod
                                tempor incidio ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <Link
                            to="/blog"
                            className="blog-card__image"
                        >
                            <img src={Blog1Image}></img>
                            <div className="blog-card__image__link-box">
                                <i className="fa-solid fa-link"></i>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
