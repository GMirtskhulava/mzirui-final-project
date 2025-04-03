import React from 'react'

function Slider() {
    return (
    <div className="slider-container">
        <div className="slider-content">
            <div className="slider-text">
                <h3 className="slider-text__offer">65% OFF</h3>
                <h2 className="slider-text__header">NEW PLANT</h2>
                <p className="slider-text__desc">Pronia, With 100% Natural, Organic & Plant Shop.</p>
            </div>
            <div className="slider-image">
                <img src="https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-2-524x617.png"></img>
            </div>
        </div>
        <div className="slider-buttons">
            <button><i className="fa-solid fa-arrow-left"></i></button>
            <button><i className="fa-solid fa-arrow-right"></i></button>
        </div>
    </div>
    )
}

export default Slider