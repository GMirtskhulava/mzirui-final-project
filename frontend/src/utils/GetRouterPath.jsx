export default function GetRouterPathName(pathname) {
    switch (true) {
        case pathname === '/':
            return 'Home';
        case pathname === '/contact':
            return 'Contact Us';
        case pathname === '/about':
            return 'About Us';
        case pathname === '/shop':
            return 'Shop';
        case pathname === '/blog':
            return 'Blog';
        case pathname === '/login':
            return 'Login';
        case pathname === '/register':
            return 'Register';
        case pathname === '/profile':
            return 'Your Profile';
        case pathname === '/whishlist':
            return 'Wishlist';
        case pathname === '/checkout':
            return 'Checkout';
        case pathname === '/forgot-password':
            return 'Forgot Password';
        case pathname === '/reset-password':
            return 'Reset Password';
        case pathname.startsWith('/reset-password/'):
            return 'Reset Password';
        case pathname.startsWith('/product/'):
            return 'Product Details';
        case pathname === '/wishlist': 
            return 'Wishlist';
        case pathname === '/cart':
            return 'Cart';
        default:
            return '404 - Page not found';
    }
}
