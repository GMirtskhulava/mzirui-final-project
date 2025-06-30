import { useState, useEffect } from 'react';

import { RouterPath, Filters, ProductList } from '../components/index.js';

// import { getProducts } from '../api/ProductsApi';

import { useTranslation } from 'react-i18next';
import { useProductsData, useCurrencyData } from '../context/index.js';

function ShopPage() {
    const { i18n } = useTranslation();
    const { productsData } = useProductsData();
    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const { choosedCurrency } = useCurrencyData();

    // Filt
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(500);


    useEffect(() => {
        if (!productsData) return;
        let filtered = productsData;
        
        if (category.toLowerCase() !== 'all') {
            filtered = filtered.filter((product) => product.category.name === category);
        }
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter((product) =>
                product.title[i18n.language].toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered = filtered.filter(
            (product) => {
                return product.price[choosedCurrency] >= minPrice && product.price[choosedCurrency] <= maxPrice
            }
        );

        setFilteredProducts(filtered);
    }, [productsData, category, searchTerm, minPrice, maxPrice, choosedCurrency]);

    return (
        <>
            <RouterPath />
            <div className="shop-page">
                <Filters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    category={category}
                    setCategory={setCategory}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                />
                <ProductList
                    filteredProducts={filteredProducts}
                    maxProductsPerPage="20"
                />
            </div>
        </>
    );
}

export default ShopPage;
