import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoaderProvider } from './context/LoaderContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { NotifProvider } from './context/NotifContext.jsx';

import './language/i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <UserProvider>
                <LoaderProvider>
                    <ProductsProvider>
                        <NotifProvider>
                            <WishlistProvider>
                                <CartProvider>
                                    <App />
                                </CartProvider>
                            </WishlistProvider>
                        </NotifProvider>
                    </ProductsProvider>
                </LoaderProvider>
            </UserProvider>
        </Router>
    </React.StrictMode>
);
