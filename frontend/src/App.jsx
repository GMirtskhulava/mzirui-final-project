//
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//

// scss
import './styles/style.scss';

// Layouts
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';

// Routes
import HomePage from './routes/HomePage';
import ContactPage from './routes/ContactPage';
import AboutPage from './routes/AboutPage';
import ShopPage from './routes/ShopPage';
import BlogPage from './routes/BlogPage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import ProfilePage from './routes/ProfilePage';
import WishlistPage from './routes/WishlistPage';
import CheckoutPage from './routes/CheckoutPage';
import NotFoundPage from './routes/NotFoundPage';

// components

// utils
import GetRouterPathName from './utils/GetRouterPath';

// https://htmldemo.net/pronia/pronia/index.html
function App() {
    useEffect(() => {
        const title = GetRouterPathName(window.location.pathname);
        document.title = `${title} | Pronia`;
    }, []);

    return (
        <>
            <Header />
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
                        path="/profile"
                        element={<ProfilePage />}
                    ></Route>
                    <Route
                        path="/whishlist"
                        element={<WishlistPage />}
                    ></Route>
                    <Route
                        path="/checkout"
                        element={<CheckoutPage />}
                    ></Route>
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    ></Route>
                </Routes>
            </Main>

            <Footer />
        </>
    );
}

export default App;
