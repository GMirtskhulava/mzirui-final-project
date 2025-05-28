//
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//

// scss
import './styles/style.scss';

//
import { useLoader } from './context/LoaderContext';
import Loader from './components/Loader';

// Layouts
import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';

// Routes
import ProtectedRoute from './routes/ProtectedRoute';

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
import ForgotPassword from './routes/ForgotPassword';
import ResetPassword from './routes/ResetPassword';

// components

// utils
import GetRouterPathName from './utils/GetRouterPath';

// Hooks
import useScrollTop from './hooks/useScrollTop';

// https://htmldemo.net/pronia/pronia/index.html
function App() {
    useScrollTop();

    const { loading } = useLoader();
    const { useFakeLoader } = useLoader();

    useEffect(() => {
        const title = GetRouterPathName(window.location.pathname);
        document.title = `${title} | Pronia`;
        useFakeLoader();
    }, [location.pathname]);
    return (
        <>
            <Header />
            {loading ? <Loader />
            :
            <Main>
                <Routes>
                    {/* Home */}
                    <Route path="/"
                        element={<HomePage />}
                    ></Route>
                    <Route path="/contact"
                        element={<ContactPage />}
                    ></Route>
                    <Route path="/about"
                        element={<AboutPage />}
                    ></Route>
                    <Route path="/shop"
                        element={
                            <ProtectedRoute>
                                <ShopPage />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route path="/blog"
                        element={<BlogPage />}
                    ></Route>
                    <Route path="/login"
                        element={<LoginPage />}
                    ></Route>
                    <Route
                        path="/register"
                        element={<RegisterPage />}
                    ></Route>
                    <Route path="/forgot-password"
                        element={<ForgotPassword />}
                    ></Route>
                    <Route path="/reset-password/:token"
                        element={<ResetPassword />}
                    ></Route>
                    <Route path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route path="/whishlist"
                        element={
                            <ProtectedRoute>
                                <WishlistPage />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route path="/checkout"
                        element={
                            <ProtectedRoute>
                                <CheckoutPage />
                            </ProtectedRoute>
                        }
                    ></Route>
                    <Route path="*"
                        element={<NotFoundPage />}
                    ></Route>
                </Routes>
            </Main>
}
            <Footer />
        </>
    );
}

export default App;
