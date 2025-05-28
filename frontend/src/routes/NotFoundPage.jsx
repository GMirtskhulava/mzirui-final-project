import React from 'react';
import RouterPath from '../components/RouterPath';

import { useTranslation } from 'react-i18next';


function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <>
            <RouterPath />
            <div className="notFound-page">
                <h1 className="">404 | {t("error.notFound")}</h1>
            </div>
        </>
    );
}

export default NotFoundPage;
