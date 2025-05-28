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

//
import { getToken, getUser } from './api/UsersApi';
import { getProducts } from './api/ProductsApi'
import { useUserData } from './context/UserContext';
import { useProductsData } from './context/ProductsContext';

// https://htmldemo.net/pronia/pronia/index.html
function App() {
    useScrollTop();

    const { loading } = useLoader();
    const { useFakeLoader } = useLoader();
    const { loggedIn, userData, login, logout } = useUserData();
    const { setProductsData } = useProductsData();

    useEffect(() => {
        const title = GetRouterPathName(window.location.pathname);
        document.title = `${title} | Pronia`;
        useFakeLoader();
    }, [location.pathname]);

    useEffect(() => {
        // console.log(`LoggedIn: ${loggedIn} | userData: ${userData}`)

        const fetchUserData = async () => {
            try {
                const tokenResponse = await getToken();
                const token = tokenResponse?.data?.token;
                if (!token) {
                    if(loggedIn || userData) logout()
                    return;
                }

                const userRes = await getUser(token);
                if (userRes?.data) {
                    console.log(userRes);
                    login(userRes.data)
                }
                else {
                    if(loggedIn || userData) logout()

                }
            } catch (err) {
                if(loggedIn || userData) logout()
            }
        };

        const fetchProductData = async () => {
            await getProducts().then((res) => {
                setProductsData(res.data.products)
            }).catch((err)=> {
                setProductsData([]);
            })
        }

        fetchUserData();
        fetchProductData();
        if(!loggedIn) logout();
    }, [])
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
                        element={<ShopPage />}
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
