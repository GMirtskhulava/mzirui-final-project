import { useEffect, useState } from 'react';



function Slider({ t }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderData = [
        {
            offer: '65%',
            imgSrc: 'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-1-524x617.png',
        },
        {
            offer: '50%',
            imgSrc: 'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-2-524x617.png',
        },
    ]

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    }
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderData.length) % sliderData.length);
    }

    useEffect(() => {
        const interval = setInterval(handleNext, 10_000);

        return () => clearInterval(interval)
    }, [currentIndex])
    return (
        <div className="slider-container">
            <div className="slider-content" key={currentIndex}>
                <div className="slider-text">
                    <h3 className="slider-text__offer animate__animated animate__backInDown">{sliderData[currentIndex].offer} {t("homePage.slider.offerText")}</h3>
                    <h2 className="slider-text__header animate__animated animate__fadeInDown">{t("homePage.slider.newPlant")}</h2>
                    <p className="slider-text__desc animate__animated animate__backInLeft">
                        {t("homePage.slider.proniaSlogan")}
                    </p>
                </div>
                <div className="slider-image animate__animated animate__fadeInRight">
                    <img src={sliderData[currentIndex].imgSrc}></img>
                </div>
            </div>
            <div className="slider-buttons">
                <button onClick={handlePrev}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button onClick={handleNext}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
}

export default Slider;
