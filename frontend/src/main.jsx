import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoaderProvider } from './context/LoaderContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';

import "./language/i18n.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <UserProvider>
                <LoaderProvider>
                    <ProductsProvider>
                        <App />
                    </ProductsProvider>
                </LoaderProvider>
            </UserProvider>
        </Router>
    </React.StrictMode>
);
