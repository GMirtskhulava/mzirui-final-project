import { useState, useEffect } from 'react';

import { RouterPath, Filters, ProductList } from '../components/index.js';

// import { getProducts } from '../api/ProductsApi';

import { useProductsData } from '../context/index.js';

function ShopPage() {
    const { productsData } = useProductsData();
    const [filteredProducts, setFilteredProducts] = useState(productsData);

    // Filt
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [minPrice, setMinPrice] = useState(5);
    const [maxPrice, setMaxPrice] = useState(500);

    // useEffect(() => {
    //     getProducts()
    //         .then(res => {
    //             setProducts(res.data.products);
    //             setFilteredProducts(res.data.products);
    //             console.log(res.data.products)
    //         })
    //         .catch(err => {
    //             console.error('Error fetching products:', err);
    //         });
    // }, []);

    useEffect(() => {
        if (!productsData) return;
        let filtered = productsData;

        if (category !== 'All') {
            filtered = filtered.filter((product) => product.category.name === category);
        }
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter((product) =>
                product.title.en.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        filtered = filtered.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
        );

        setFilteredProducts(filtered);
    }, [productsData, category, searchTerm, minPrice, maxPrice]);

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
