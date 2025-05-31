import React from 'react';
import { Link } from 'react-router-dom';

import { BrandIcon1, BrandIcon2, BrandIcon3, BrandIcon4, BrandIcon5 } from '../../assets/index.js';

function Brands() {
    return (
        <div className="brands-section">
            <div className="brands-box">
                <Link to="/brand">
                    <img src={BrandIcon1}></img>
                </Link>
                <Link to="/brand">
                    <img src={BrandIcon2}></img>
                </Link>
                <Link to="/brand">
                    <img src={BrandIcon3}></img>
                </Link>
                <Link to="/brand">
                    <img src={BrandIcon4}></img>
                </Link>
                <Link to="/brand">
                    <img src={BrandIcon5}></img>
                </Link>
            </div>
        </div>
    );
}

export default Brands;
