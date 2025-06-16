import React from 'react';
import { useLoader } from '../context/index.js';

function Loading() {
    const { loading } = useLoader();

    return (
        <div className={`loadingScreen ${loading ? 'fade-in' : 'fade-out'}`}>
            <span className="loadingScreen-loader"></span>
        </div>
    );
}

export default Loading;
