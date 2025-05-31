import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        switch (pathname) {
            case '/':
                document.title = 'Home';
                break;
            case '/contact':
                document.title = 'Contact Us';
                break;
            case '/about':
                document.title = 'About Us';
                break;
            case '/shop':
                document.title = 'Shop';
                break;
            case '/blog':
                document.title = 'Blog';
                break;
            case '/login':
                document.title = 'Login';
                break;
            case '/register':
                document.title = 'Register';
                break;
            case '/profile':
                document.title = 'Your Profile';
                break;
            case '/whishlist':
                document.title = 'Wishlist';
                break;
            case '/checkout':
                document.title = 'Checkout';
                break;
            case '/forgot-password':
                document.title = 'Forgot Password';
                break;
            case '/reset-password':
                document.title = 'Reset Password';
                break;
            default:
                document.title = '404 - Page not found';
                break;
        }
    }, [pathname]);
};

export default useDocumentTitle;
