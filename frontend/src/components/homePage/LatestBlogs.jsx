import React from 'react';
import { Link } from 'react-router-dom';

import Blog1Image from '../../assets/images/blog1-img.png';

function LatestBlogs() {
    return (
        <div className="latestBlogs-section">
            <div className="latestBlogs-header">
                <h2 className="latestBlogs-header__title">Latest Blog</h2>
                <p className="latestBlogs-header__desc">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                    in a piece of classical Latin literature
                </p>
            </div>
            <div className="latestBlogs-blogsArea">
                <div className="blog-card">
                    <div className="blog-card__content">
                        <p className="blog-card__content__info">By: Admin | 24 April 2021</p>
                        <h2 className="blog-card__content__title">There Many Variations</h2>
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
                            <i class="fa-solid fa-link"></i>
                        </div>
                    </Link>
                </div>
                <div className="blog-card">
                    <div className="blog-card__content">
                        <p className="blog-card__content__info">By: Admin | 24 April 2021</p>
                        <h2 className="blog-card__content__title">There Many Variations</h2>
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
                            <i class="fa-solid fa-link"></i>
                        </div>
                    </Link>
                </div>
                <div className="blog-card">
                    <div className="blog-card__content">
                        <p className="blog-card__content__info">By: Admin | 24 April 2021</p>
                        <h2 className="blog-card__content__title">There Many Variations</h2>
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
                            <i class="fa-solid fa-link"></i>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LatestBlogs;
