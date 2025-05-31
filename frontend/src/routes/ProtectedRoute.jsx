import { NotAllowedPage } from './index.js';

import { useUserData } from '../context/UserContext';

function ProtectedRoute({ children }) {
    const { loggedIn } = useUserData();

    if (loggedIn === null) {
        return <div>Loading...</div>;
    } else if (loggedIn === false) {
        return <NotAllowedPage />;
    }

    return children;
}

export default ProtectedRoute;
