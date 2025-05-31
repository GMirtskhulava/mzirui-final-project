import { RouterPath } from '../components/index.js';
import { useTranslation } from 'react-i18next';

function NotAllowedPage() {
    const { t } = useTranslation();

    return (
        <>
            <RouterPath />
            <div className="notAllowed-page">
                <h1 className="">403 | {t('error.accessDenied')}</h1>
                <p className="mt-4 text-gray-700"> {t('error.accessDeniedDescription')}</p>
            </div>
        </>
    );
}

export default NotAllowedPage;
