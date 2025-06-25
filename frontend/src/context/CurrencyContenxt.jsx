import { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrencyData = () => useContext(CurrencyContext);

const CurrencyProvider = ({ children }) => {
    const [choosedCurrency, setChoosedCurrency] = useState(localStorage.getItem("curr") || "usd");

    return (
        <CurrencyContext.Provider value={{ choosedCurrency, setChoosedCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export { CurrencyContext, CurrencyProvider };
