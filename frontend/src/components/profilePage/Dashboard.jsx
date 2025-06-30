import { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useUserData, useNotification } from '../../context/index.js';
import { updateUserData, getUserById } from '../../api/UsersApi.js';

function Dashboard({ userId }) {
    const { loggedIn, userData } = useUserData();
    const { showNotification } = useNotification();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(false);
    const [banned, setBanned] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [activeUser, setActiveUser] = useState(null);

    useEffect(() => {
        if (!userId || !userData) return;

        if (userId === userData._id) {
            setActiveUser(userData);
        } else {
            if(!userData.admin) return setActiveUser(false)
            else {
                getUserById(userId).then((res) => {
                    if(res.status === 200) setActiveUser(res.data.data);
                    else setActiveUser([]);
                }).catch((err) => {
                    setActiveUser([])
                    console.log("Failed to load user", err);
                });
            }
        }
    }, [userId, userData]);

    useEffect(() => {
        if (!activeUser || activeUser.length === 0) return;

        const [fName, lName = ''] = activeUser.username.split(' ');
        setFirstName(fName);
        setLastName(lName);
        setEmail(activeUser.email);
        setRole(activeUser.admin);
        setBanned(activeUser.banned);
    }, [activeUser]);

    const handleUpdate = async () => {
        if (!checkValidations()) return;

        const updatedData = {
            newUsername: `${firstName} ${lastName}`,
            newEmail: email,
            newPassword: password,
            newRole: role,
            newBanStatus: banned
        };

        await updateUserData(activeUser._id, updatedData)
            .then((res) => {
                if (res.status === 204) {
                    showNotification("profile", "Nothing to update");
                } else {
                    showNotification("profile", "Data successfully updated");
                    if(activeUser._id === userData._id) window.location.href = `/profile/${userData._id}`;
                    else setActiveUser(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const checkValidations = () => {
        if (!activeUser) return false;

        if (`${firstName} ${lastName}` === activeUser.username &&
            email === activeUser.email &&
            password.length === 0 &&
            role === activeUser.admin &&
            banned === activeUser.banned) {
            console.log("nothing changed");
            return false;
        }

        if (`${firstName} ${lastName}` !== activeUser.username) {
            if (firstName.length < 2 || firstName.length > 20)
                return setErrorMsg('First name should be between 2-20 characters'), false;
            if (lastName.length < 3 || lastName.length > 50)
                return setErrorMsg('Last name should be between 3-50 characters'), false;
        }

        if (email !== activeUser.email) {
            if (!email.includes('@') || email.length < 5 || email.length > 50)
                return setErrorMsg("Enter valid email"), false;
        }

        if (password.length !== 0) {
            if (password.length < 5 || password.length > 20)
                return setErrorMsg('Please enter a valid Password [5-20 characters]'), false;
        }

        return true;
    };

    return (
        <>
            {activeUser === null ? (
                <p>Loading user...</p>
            ) : activeUser === false ? (
                <p>Access denied</p>
            ) : activeUser.length === 0 ? (
                <p>User not found</p>
            ) : (
                <div className='profile-dashboard'>
                    <div className='profile-dashboard__title'>
                        <h2>Profile Information</h2>
                        {userData.admin ? (
                            <p className='profile-dashboard__title__adm-id'>
                                User ID: <span>{activeUser._id}</span> 
                                <CopyToClipboard text={activeUser._id}>
                                    <span>
                                        <i className="fa-solid fa-copy profile-dashboard__title__adm-id__copy"></i>
                                    </span>
                                </CopyToClipboard>
                                {activeUser.banned && <span className='banned-badge'>[Banned]</span>}
                            </p>
                        ) : <></>}
                    </div>

                    <div className='profile-dashboard__row'>
                        <label>First Name:</label>
                        <input
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className='profile-dashboard__row'>
                        <label>Last Name:</label>
                        <input
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className='profile-dashboard__row'>
                        <label>Email:</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!userData?.admin}
                        />
                    </div>

                    <div className='profile-dashboard__row'>
                        <label>Password:</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='profile-dashboard__row'>
                        <label>Role:</label>
                        <select
                            disabled={activeUser._id === userData._id ? true : !userData?.admin}
                            value={role ? 'Administrator' : 'Customer'}
                            onChange={(e) => setRole(e.target.value === 'Administrator')}
                        >
                            <option value="Customer">Customer</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>
                    
                    {
                        userData.admin ? (
                            <div className='profile-dashboard__row'>
                                <label>Status:</label>
                                <select
                                    disabled={activeUser._id === userData._id ? true : !userData?.admin}
                                    value={banned ? 'Banned' : 'Active'}
                                    onChange={(e) => setBanned(e.target.value === 'Banned')}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </div>
                        ) : (<></>)
                    }

                    <p className='profile-dashboard__error'>{errorMsg}</p>

                    <button className='profile-dashboard__button' onClick={handleUpdate}>
                        Save Changes
                    </button>
                </div>
            )}
        </>
    );

}

export default Dashboard;
