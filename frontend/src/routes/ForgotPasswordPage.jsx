import { useState } from 'react';
import { Link } from 'react-router-dom';

import { forgotPasswordUser } from '../api/UsersApi';

function ForgotPasswordPage() {
    const [inputValues, setInputValues] = useState({
        email: '',
    });
    const [errormsg, setErrorMsg] = useState('');
    const [emailWasSent, setEmailWasSent] = useState(false);

    const handleFormChange = (e) => {
        setInputValues((p) => ({
            ...p,
            [e.target.name]: e.target.value,
        }));
    };

    const checkFormValidations = () => {
        if (inputValues.email === '') return false, setErrorMsg('Please fill all the fields');
        if (
            !inputValues.email.includes('@') ||
            inputValues.email.length < 5 ||
            inputValues.email.length > 50
        )
            return false, setErrorMsg('Please enter a valid email address');

        return true;
    };
    const handleNextButton = () => {
        setErrorMsg('');
        if (emailWasSent)
            return setErrorMsg(
                'A reset link has already been sent to your email address. Please check your inbox.'
            );
        if (checkFormValidations()) {
            forgotPasswordUser(inputValues.email)
                .then((res) => {
                    if (res.status === 200) {
                        setEmailWasSent(true);
                        setErrorMsg(
                            'A reset link has been sent to your email address. Please check your inbox.'
                        );
                    }
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setErrorMsg('Invalid email');
                    } else {
                        setErrorMsg('Server error, please try again later');
                    }
                });
        } else return;
    };
    return (
        <div className="forgotPassword-page">
            <div className="forgotPassword-page__form">
                <h4 className="forgotPassword-page__form__title">Forgot Password</h4>
                <div className="forgotPassword-page__form__inputs">
                    <div className="forgotPassword-page__form__inputs__input-box">
                        <label htmlFor="email">Email Address*</label>
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={inputValues.email}
                            onChange={handleFormChange}
                        />
                    </div>
                    <p className="forgotPassword-page__form__inputs__error-msg">{errormsg}</p>
                    <div className="forgotPassword-page__form__inputs__input-box-bottom">
                        <Link to="/login">Remember password? - Login</Link>
                    </div>
                    <div className="forgotPassword-page__form__inputs__button-box">
                        <button onClick={handleNextButton}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
