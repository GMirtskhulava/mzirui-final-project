import { useState, useEffect, useRef } from 'react';
import { SkeletonLoading } from '../index.js';
import { getCategories } from '../../api/CategoriesApi';

import { useCurrencyData } from '../../context/index.js';

function Filters({
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
}) {
    const { choosedCurrency } = useCurrencyData();
    const trackRef = useRef(null);
    const minTooltipRef = useRef(null);
    const maxTooltipRef = useRef(null);

    const minLimit = 1;
    const maxLimit = 500;

    const [categoryList, setCategoryList] = useState()

    useEffect(() => {
        getCategories().then((res)=>{
            if(res.status === 200) setCategoryList(res.data.categories)
            else setCategoryList([]), console.log(res?.data);
        }).catch((err) =>{
            console.error(err);
            setCategoryList([]);
        })
    }, [])
    useEffect(() => {
        const minPercent = (minPrice / maxLimit) * 100;
        const maxPercent = (maxPrice / maxLimit) * 100;

        if (trackRef.current) {
            trackRef.current.style.background = `linear-gradient(to right, #ddd ${minPercent}%, #abd373 ${minPercent}%, #abd373 ${maxPercent}%, #ddd ${maxPercent}%)`;
        }

        if (minTooltipRef.current) {
            minTooltipRef.current.style.left = `${minPercent}%`;
        }

        if (maxTooltipRef.current) {
            maxTooltipRef.current.style.left = `${maxPercent}%`;
        }
    }, [minPrice, maxPrice]);

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 20);
        setMinPrice(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 20);
        setMaxPrice(value);
    };

    const handleCategoryClick = (cat) => {
        setCategory(cat);
    };

    return (
        <div className="shop-page__filters">
            <div className="shop-page__filters__search filter-box">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="shop-page-search-icon fa-solid fa-magnifying-glass"></i>
            </div>

            <div className="shop-page__filters__main-filter filter-box">
                <div className="shop-page__filters__main-filter__section filter-categories">
                    <div className="shop-page__filters__main-filter__section__title">
                        <h2>Categories</h2>
                    </div>
                    <ul className="shop-page__filters__main-filter__section__options">
                        <li
                            key={0}
                            onClick={() => handleCategoryClick("All")}
                            style={{
                                cursor: 'pointer',
                                fontWeight: category === "All" ? 'bold' : 'normal',
                            }}
                        >
                            All
                        </li>
                        {
                            !categoryList ? (
                                <SkeletonLoading />
                            ) : categoryList && categoryList.length === 0 ? (<></>)
                                : (
                                    categoryList.map((cat) => (
                                        <li
                                            key={cat._id}
                                            onClick={() => handleCategoryClick(cat.name)}
                                            style={{
                                                cursor: 'pointer',
                                                fontWeight: category === cat.name ? 'bold' : 'normal',
                                            }}
                                        >
                                            {cat.name}
                                        </li>
                                    ))
                                )
                        }
                    </ul>
                </div>

                <div className="shop-page__filters__main-filter__section filter-price">
                    <div className="shop-page__filters__main-filter__section__title">
                        <h2>Price</h2>
                    </div>
                    <div className="shop-page__filters__main-filter__section__range-slider">
                        <div
                            className="slider-track"
                            ref={trackRef}
                        ></div>

                        <input
                            type="range"
                            min={minLimit}
                            max={maxLimit}
                            value={minPrice}
                            onChange={handleMinChange}
                        />
                        <input
                            type="range"
                            min={minLimit}
                            max={maxLimit}
                            value={maxPrice}
                            onChange={handleMaxChange}
                        />

                        <div
                            className="tooltip min-tooltip"
                            ref={minTooltipRef}
                        >
                        {choosedCurrency === "usd" ? "$" : "₾"}{minPrice}
                        </div>
                        <div
                            className="tooltip max-tooltip"
                            ref={maxTooltipRef}
                        >
                        {choosedCurrency === "usd" ? "$" : "₾"}{maxPrice}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
