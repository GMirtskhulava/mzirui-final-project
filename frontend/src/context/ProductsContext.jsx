import { createContext, useState, useContext } from 'react';

const ProductsContext = createContext({
    productsData: null,
    setProductsData: () => {},
});

export const useProductsData = () => useContext(ProductsContext);

const ProductsProvider = ({ children }) => {
    const [productsData, setProductsData] = useState();

    return (
        <ProductsContext.Provider value={{ productsData, setProductsData }}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsContext, ProductsProvider };
