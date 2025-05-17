import { useState, useEffect } from 'react';
import { getToken } from '../api/UsersApi';

import NotAllowed from './NotAllowed';

function ProtectedRoute({ children }) {
    const [haveAccess, setHaveAccess] = useState(null);

    useEffect(() => {
        console.log('ProtectedRoute');
        getToken()
            .then((res) => {
                if (res.status === 200) {
                    setHaveAccess(true);
                } else {
                    console.log(res.status);
                    setHaveAccess(false);
                }
            })
            .catch((err) => {
                console.error(err);
                setHaveAccess(false);
            });
    }, []);

    if (haveAccess === null) {
        return <div>Loading...</div>;
    }
    if (haveAccess === false) {
        return <NotAllowed />;
    }

    return children;
}

export default ProtectedRoute;
