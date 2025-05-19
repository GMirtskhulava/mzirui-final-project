import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoaderProvider } from './context/LoaderContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <LoaderProvider>
                <App />
            </LoaderProvider>
        </Router>
    </React.StrictMode>
);
