import React from 'react'

function OurProduct() {
    return (
    <div className='ourProduct-section'>
        <div className='ourProduct-box'>
            <div className='ourProduct-box__header'>
                <h2>OUR PRODUCT</h2>
                <div className='ourProduct-box__header__filter-section'>
                    <button className='active'>Featured</button>
                    <button>Bestseller</button>
                    <button>Latest</button>
                </div>
            </div>
            <div className='ourProduct-box__content'>
                <div className='ourProduct-box__content__card'>
                    <div className='ourProduct-box__content__card__image'>
                        <a className="view-button" href='/product/1'>VIEW</a>
                        <a href='product/1'>
                            <img src="https://htmldemo.net/pronia/pronia/assets/images/product/medium-size/1-3-270x300.jpg"></img>
                        </a>
                    </div>
                    <div className='ourProduct-box__content__card__content'>
                        <a className='ourProduct-box__content__card__content__title' 
                            href='product/1'>
                            American Kaktus
                        </a>
                        <p className='ourProduct-box__content__card__content__price'>$99.99</p>
                        <div className='ourProduct-box__content__card__content__stars'>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default OurProduct