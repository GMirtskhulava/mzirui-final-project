import React from 'react';
import { Link } from 'react-router-dom';

import {
    CollectionBanner1,
    CollectionBanner2,
    CollectionBanner3,
    CollectionBanner4,
} from '../../assets/index.js';

function Collections() {
    return (
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
                        <p className="collection-box__info__desc">Collection of Cactus</p>
                        <h3 className="collection-box__info__title">Pottery Pots & Plants</h3>
                        <button>
                            <Link to="/shop">Shop Now</Link>
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
                        <p className="collection-box__info__desc">New Collection</p>
                        <h3 className="collection-box__info__title">Plant Port</h3>
                        <button>
                            <Link to="/shop">Shop Now</Link>
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
                        <p className="collection-box__info__desc">New Collection</p>
                        <h3 className="collection-box__info__title">Plant Port</h3>
                        <button>
                            <Link to="/shop">Shop Now</Link>
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
                        <p className="collection-box__info__desc">Collection of Cactus</p>
                        <h3 className="collection-box__info__title">Hanging Pots & Plant</h3>
                        <button>
                            <Link to="/shop">Shop Now</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collections;
