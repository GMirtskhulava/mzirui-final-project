import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        switch (true) {
            case pathname === '/':
                document.title = 'Home | Pronia';
                break;
            case pathname === '/contact':
                document.title = 'Contact Us | Pronia';
                break;
            case pathname === '/about':
                document.title = 'About Us | Pronia';
                break;
            case pathname === '/shop':
                document.title = 'Shop | Pronia';
                break;
            case pathname === '/blog':
                document.title = 'Blog | Pronia';
                break;
            case pathname === '/login':
                document.title = 'Login | Pronia';
                break;
            case pathname === '/register':
                document.title = 'Register | Pronia';
                break;
            case pathname === '/profile':
                document.title = 'Your Profile | Pronia';
                break;
            case pathname === '/whishlist':
                document.title = 'Wishlist | Pronia';
                break;
            case pathname === '/checkout':
                document.title = 'Checkout | Pronia';
                break;
            case pathname === '/forgot-password':
                document.title = 'Forgot Password | Pronia';
                break;
            case pathname.startsWith('/reset-password/'):
                document.title = 'Reset Password | Pronia';
                break;
            case pathname.startsWith('/product/'):
                document.title = 'Product Details | Pronia';
                break;
            case pathname === '/wishlist':
                document.title = 'Wishlist | Pronia';
                break;
            case pathname === '/cart':
                document.title = 'Cart | Pronia';
                break;
            default:
                document.title = '404 - Page not found | Pronia';
                break;
        }
    }, [pathname]);
};

export default useDocumentTitle;
