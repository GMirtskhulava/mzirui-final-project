export default function GetRouterPathName(pathname) {
    switch (pathname) {
        case '/':
            return 'Home';
        case '/contact':
            return 'Contact Us';
        case '/about':
            return 'About Us';
        case '/shop':
            return 'Shop';
        case '/blog':
            return 'Blog';
        case '/login':
            return 'Login';
        case '/register':
            return 'Register';
        case '/profile':
            return 'Your Profile';
        case '/whishlist':
            return 'Wishlist';
        case '/checkout':
            return 'Checkout';
        default:
            return '404 - Page not found';
    }
}
