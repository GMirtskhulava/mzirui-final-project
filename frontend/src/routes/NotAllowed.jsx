import RouterPath from '../components/RouterPath';

function NotAllowed() {
    return (
        <>
            <RouterPath />
            <div className="notAllowed-page">
                <h1 className="">403 | Access denied</h1>
                <p className="mt-4 text-gray-700">You don't have permission to access this page.</p>
            </div>
        </>
    );
}

export default NotAllowed;
