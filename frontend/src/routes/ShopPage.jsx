import { useState, useEffect } from 'react';
import RouterPath from '../components/RouterPath';

import Filters from '../components/shopPage/Filters';
import ProductList from '../components/shopPage/ProductList';

import { getProducts } from '../api/ProductsApi';

function ShopPage() {
    const [products, setProducts] = useState(undefined);
    const [filteredProducts, setFilteredProducts] = useState(undefined);

    // Filt
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [minPrice, setMinPrice] = useState(5);
    const [maxPrice, setMaxPrice] = useState(350);

    useEffect(() => {
        getProducts()
            .then(res => {
                setProducts(res.data.products);
                setFilteredProducts(res.data.products);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
            });
    }, []);

    useEffect(() => {
        if(!products) return;
        let filtered = [...products];

        if(category !== 'All') {
            filtered = filtered.filter(product => product.category.name === category);
        }
        if(searchTerm.trim() !== '') {
            filtered = filtered.filter(product =>
                product.title.en.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        filtered = filtered.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        );

        setFilteredProducts(filtered);
    }, [products, category, searchTerm, minPrice, maxPrice]);

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
                <ProductList filteredProducts={filteredProducts} />
            </div>
        </>
    );
}

export default ShopPage;
