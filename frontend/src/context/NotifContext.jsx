import { createContext, useState, useContext } from 'react';
import Notification from '../components/Notification';

const NotifContext = createContext();

export const useNotification = () => useContext(NotifContext);

const NotifProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (title, message, type = 0) => {
        const id = Date.now();

        const newNotif = { id, title, message, type };
        setNotifications((prev) => [...prev, newNotif]);

        if(notifications.length === 10) {
            setNotifications((prev) => prev.filter((notif) => notif.id !== notifications[0].id));
        }

        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 3500);
    };

    return (
        <NotifContext.Provider value={{ showNotification }}>
            <div className="notification-list">
                {notifications.map((notif) => (
                    <Notification key={notif.id} title={notif.title} message={notif.message} type={notif.type}/>
                ))}
            </div>
            {children}
        </NotifContext.Provider>
    );
};

export { NotifContext, NotifProvider };
