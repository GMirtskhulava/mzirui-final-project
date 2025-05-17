import React from 'react';

import { Link } from 'react-router-dom';

import TeamImg1 from '../../assets/images/team-img-1.png';
import TeamImg2 from '../../assets/images/team-img-2.png';
import TeamImg3 from '../../assets/images/team-img-3.png';
import TeamImg4 from '../../assets/images/team-img-4.png';

function OurTeam() {
    return (
        <div className="about-page__our-team">
            <div className="about-page__our-team__header">
                <h2>Our team</h2>
                <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                    in a piece of classical Latin literature
                </p>
            </div>
            <div className="about-page__our-team__content">
                <div className="about-page__our-team__content__card">
                    <div className="about-page__our-team__content__card__image">
                        <img src={TeamImg1}></img>
                        <div className="about-page__our-team__content__card__image__hover-content">
                            <h2>Michael Murphy</h2>
                            <p>Sales man</p>
                            <div className="about-page__our-team__content__card__image__hover-content__links">
                                <ul>
                                    <li>
                                        <Link to="https://facebook.com">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://twitter.com">
                                            <i className="fa-brands fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://instagram.com">
                                            <i className="fa-brands fa-instagram"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="about-page__our-team__content__card__content">
                        <p>Michael Murphy</p>
                    </div>
                </div>
                <div className="about-page__our-team__content__card">
                    <div className="about-page__our-team__content__card__image">
                        <img src={TeamImg2}></img>
                        <div className="about-page__our-team__content__card__image__hover-content">
                            <h2>Michael Murphy</h2>
                            <p>Sales man</p>
                            <div className="about-page__our-team__content__card__image__hover-content__links">
                                <ul>
                                    <li>
                                        <Link to="https://facebook.com">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://twitter.com">
                                            <i className="fa-brands fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://instagram.com">
                                            <i className="fa-brands fa-instagram"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="about-page__our-team__content__card__content">
                        <p>Kari Rasmus</p>
                    </div>
                </div>
                <div className="about-page__our-team__content__card">
                    <div className="about-page__our-team__content__card__image">
                        <img src={TeamImg3}></img>
                        <div className="about-page__our-team__content__card__image__hover-content">
                            <h2>Michael Murphy</h2>
                            <p>Sales man</p>
                            <div className="about-page__our-team__content__card__image__hover-content__links">
                                <ul>
                                    <li>
                                        <Link to="https://facebook.com">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://twitter.com">
                                            <i className="fa-brands fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://instagram.com">
                                            <i className="fa-brands fa-instagram"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="about-page__our-team__content__card__content">
                        <p>Britney Cooper</p>
                    </div>
                </div>
                <div className="about-page__our-team__content__card">
                    <div className="about-page__our-team__content__card__image">
                        <img src={TeamImg4}></img>
                        <div className="about-page__our-team__content__card__image__hover-content">
                            <h2>Michael Murphy</h2>
                            <p>Sales man</p>
                            <div className="about-page__our-team__content__card__image__hover-content__links">
                                <ul>
                                    <li>
                                        <Link to="https://facebook.com">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://twitter.com">
                                            <i className="fa-brands fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://instagram.com">
                                            <i className="fa-brands fa-instagram"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="about-page__our-team__content__card__content">
                        <p>Marissa Swan</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurTeam;
