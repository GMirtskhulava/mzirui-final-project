import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useUserData, useNotification } from '../context/index.js';
import { RouterPath, Dashboard, Orders, Manage } from '../components/index.js';
import { logoutUser } from '../api/UsersApi.js';

function ProfilePage() {
    const { userId } = useParams();

    const { showNotification } = useNotification()
    const { userData, logout } = useUserData();

    const [choosedTab, setChoosedTab] = useState(0);
    const [buttonClicked, setButtonClicked] = useState(false);

    const renderTabContent = () => {
        switch (choosedTab) {
            case 0:
                return <Dashboard userId={userId} />;
            case 1:
                return <Orders userId={userId} />;
            case 2:
                return userData.admin ? <Manage /> : null;
            default:
                return null;
        }
    };

    const handleLogout = async () => {
        if (buttonClicked) return;
        setButtonClicked(true)
        try {
            const response = await logoutUser();
            if (response.status === 200) {
                showNotification("logout", "Successfully logged out");
                setTimeout(() => {
                    logout();
                    window.location.href = "/";
                }, 1000);
            } else {
                showNotification("logout", "An error occurred. Try again later.", 1);
                setButtonClicked(false);
            }
        } catch (err) {
            console.log(err)
            showNotification("logout", "An error occurred. Try again later.", 1);
            setButtonClicked(false);
        }

        setButtonClicked(false)
    }

    return (
        <>
            <RouterPath />
            <div className='profile'>
                <div className='profile__header'>
                    <ul>
                        <li onClick={() => setChoosedTab(0)} className={choosedTab === 0 ? 'active' : ''} >
                            Dashboard
                        </li>
                        <li onClick={() => setChoosedTab(1)} className={choosedTab === 1 ? 'active' : ''} >
                            Orders
                        </li>
                        {
                            userId === userData?._id && userData.admin ? (
                                <li onClick={() => setChoosedTab(2)} className={choosedTab === 2 ? 'active' : ''} >
                                    Admin Panel
                                </li>
                            ) : (<></>)
                        }
                        {
                            userId === userData?._id ? (
                                <li onClick={handleLogout} >
                                    Log Out
                                </li>
                            ) : (<></>)
                        }
                    </ul>
                </div>
                <div className="profile__tab-content">
                    {renderTabContent()}
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
