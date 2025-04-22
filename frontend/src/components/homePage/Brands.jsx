import React from 'react'
import { Link } from 'react-router-dom';

import BrandIcon1 from "../../assets/images/brand-icon1.png";
import BrandIcon2 from "../../assets/images/brand-icon2.png";
import BrandIcon3 from "../../assets/images/brand-icon3.png";
import BrandIcon4 from "../../assets/images/brand-icon4.png";
import BrandIcon5 from "../../assets/images/brand-icon5.png";

function Brands() {
    return (
    <div className='brands-section'>
        <div className='brands-box'>
            <Link to="/brand"><img src={BrandIcon1}></img></Link>
            <Link to="/brand"><img src={BrandIcon2}></img></Link>
            <Link to="/brand"><img src={BrandIcon3}></img></Link>
            <Link to="/brand"><img src={BrandIcon4}></img></Link>
            <Link to="/brand"><img src={BrandIcon5}></img></Link>
        </div>
    </div>
    )
}

export default Brands