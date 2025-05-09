import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import GetRouterPathName from '../utils/GetRouterPath';

function RouterPath() {
    const [currentPage, setCurrentPage] = useState('');
    useEffect(() => {
        setCurrentPage(GetRouterPathName(window.location.pathname));
    }, []);

    return (
        <div className="router-path-banner">
            <h1 className="router-path-banner__header">{currentPage}</h1>
            <div className="router-path-banner__content">
                <Link
                    to="/"
                    className="router-path-banner__content__link"
                >
                    Home
                </Link>
                <div className="router-path-banner__content__square"></div>
                <p className="router-path-banner__content__currentPath">{currentPage}</p>
            </div>
        </div>
    );
}

export default RouterPath;
