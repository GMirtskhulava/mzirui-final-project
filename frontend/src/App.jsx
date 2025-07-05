//
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//

// scss
import './styles/style.scss';

//
import { useLoader } from './context/index.js';
import { Loader } from './components/index.js';

// Layouts
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';

// Routes

import {
    ProtectedRoute,
    HomePage,
    ContactPage,
    AboutPage,
    ShopPage,
    BlogPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    WishlistPage,
    CheckoutPage,
    NotFoundPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    SingleProductPage,
    CartPage
} from './routes/index.js';

// components

// utils

// Hooks
import useScrollTop from './hooks/useScrollTop';
import useDocumentTitle from './hooks/useDocumentTitle';

//
import { getToken, getUser } from './api/UsersApi';
import { getProducts } from './api/ProductsApi';
import { useUserData } from './context/UserContext';
import { useProductsData } from './context/ProductsContext';
import { useWishlistData } from './context/WishlistContext.jsx';
import { useCartData } from './context/CartContext.jsx';

// https://htmldemo.net/pronia/pronia/index.html
function App() {
    useDocumentTitle();
    useScrollTop();

    const { loading } = useLoader();
    const { useFakeLoader } = useLoader();
    const { loggedIn, userData, login, logout } = useUserData();
    const { setProductsData } = useProductsData();
    const { setWishlistData } = useWishlistData();
    const { setCartData } = useCartData();

    useEffect(() => {
        useFakeLoader();
    }, [location.pathname]);

    useEffect(() => {
        // console.log(`LoggedIn: ${loggedIn} | userData: ${userData}`)

        const fetchUserData = async () => {
            try {
                const tokenResponse = await getToken();
                const token = tokenResponse?.data?.token;
                if (!token) {
                    if (loggedIn || userData) logout();
                    return;
                }

                const userRes = await getUser(token);
                if (userRes?.data) {
                    // console.log(userRes);
                    login(userRes.data);
                } else {
                    if (loggedIn || userData) logout();
                }
            } catch (err) {
                if (loggedIn || userData) logout();
            }
        };

        const fetchProductData = async () => {
            try {
                const response = await getProducts();
                if (response?.data?.products) {
                    setProductsData(response.data.products);
                } else {
                    setProductsData([]);
                }
            } catch(err) {
                console.error("Error fetching product data:", err);
                setProductsData([]);
            }
        };

        fetchUserData();
        fetchProductData();
        if (!loggedIn) {
            logout();
        }
    }, []);

    useEffect(() => {
        if (loggedIn && userData) {
            if(userData.banned) return logout();
            setWishlistData(userData.wishlist || []);
            setCartData(userData.cart || [])
        } else {
            const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlistData(localWishlist);
        }
    }, [loggedIn, userData]);
    return (
        <>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <Main>
                    <Routes>
                        {/* Home */}
                        <Route
                            path="/"
                            element={<HomePage />}
                        ></Route>
                        <Route
                            path="/contact"
                            element={<ContactPage />}
                        ></Route>
                        <Route
                            path="/about"
                            element={<AboutPage />}
                        ></Route>
                        <Route
                            path="/shop"
                            element={<ShopPage />}
                        ></Route>
                        <Route
                            path="/product/:id"
                            element={<SingleProductPage />}
                        ></Route>
                        <Route
                            path="/blog"
                            element={<BlogPage />}
                        ></Route>
                        <Route
                            path="/login"
                            element={<LoginPage />}
                        ></Route>
                        <Route
                            path="/register"
                            element={<RegisterPage />}
                        ></Route>
                        <Route
                            path="/forgot-password"
                            element={<ForgotPasswordPage />}
                        ></Route>
                        <Route
                            path="/reset-password/:token"
                            element={<ResetPasswordPage />}
                        ></Route>
                        <Route
                            path="/profile/:userId"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route
                            path="/wishlist"
                            element={<WishlistPage />}
                        ></Route>
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route
                            path="/checkout"
                            element={
                                <ProtectedRoute>
                                    <CheckoutPage />
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route
                            path="*"
                            element={<NotFoundPage />}
                        ></Route>
                    </Routes>
                </Main>
            )}
            <Footer />
        </>
    );
}

export default App;
