function Notification({ title, message, type = 0 }) {
    return (
        <div className="notification-card">
            <div className="notification-card__content">
                <h4 className="notification-card__content__title">{title}</h4>
                <p className="notification-card__content__text">{message}</p>
            </div>
            <div className="notification-card__icon">
                {
                    type === 1 ? <i class="fa-solid fa-circle-xmark notification-card__icon__error"></i>
                    : <i className="fa-solid fa-circle-info notification-card__icon__info"></i>
                }
            </div>
        </div>
    );
}

export default Notification;
