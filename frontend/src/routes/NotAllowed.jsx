import RouterPath from '../components/RouterPath';
import { useTranslation } from 'react-i18next';


function NotAllowed() {
    const { t } = useTranslation();

    return (
        <>
            <RouterPath />
            <div className="notAllowed-page">
                <h1 className="">403 | {t("error.accessDenied")}</h1>
                <p className="mt-4 text-gray-700"> {t("error.accessDeniedDescription")}</p>
            </div>
        </>
    );
}

export default NotAllowed;
