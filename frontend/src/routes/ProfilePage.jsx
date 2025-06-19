import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserData, useNotification} from '../context/index.js';
import { RouterPath, Dashboard, Orders, Afind } from '../components/index.js'; // Add Orders if you have it

function ProfilePage() {
    const { userId } = useParams();

    const { userData } = useUserData();

    const [choosedTab, setChoosedTab] = useState(0);

    const renderTabContent = () => {
        switch(choosedTab) {
            case 0:
                return <Dashboard userId={userId}/>;
            case 1:
                return <Orders userId={userId}/>;
            case 2:
                return <div>You have been logged out.</div>;
            case 3: 
                return userData.admin ? <Afind /> : null;
            default:
                return null;
        }
    };

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
                                <li onClick={() => setChoosedTab(3)} className={choosedTab === 3 ? 'active' : ''} >
                                    A-Find
                                </li>
                            ) : (<></>)
                        }
                        {
                            userId === userData?._id ? (
                                <li onClick={() => setChoosedTab(2)} className={choosedTab === 2 ? 'active' : ''} >
                                    Log Out
                                </li>
                            )  : (<></>)
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
