import { useState } from 'react';
import { Link } from 'react-router-dom';

import { forgotPasswordUser } from '../api/UsersApi';
import { useNotification } from '../context/index.js';

function ForgotPasswordPage() {
    const { showNotification } = useNotification();

    const [inputValues, setInputValues] = useState({
        email: '',
    });
    const [errormsg, setErrorMsg] = useState('');
    const [emailWasSent, setEmailWasSent] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);

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
    const handleNextButton = async () => {
        if(buttonClicked) return;
        setButtonClicked(true);
        setErrorMsg('');
        if(emailWasSent) {
            setErrorMsg('A reset link has already been sent to your email address. Please check your inbox.'), showNotification('forgot password', 'A reset link has already been sent to your email address. Please check your inbox.');
        }
        else {
            if(checkFormValidations()) {
                try {
                    const response = await forgotPasswordUser(inputValues.email);
                    if(response?.status === 200) {
                        setEmailWasSent(true);
                        setErrorMsg('A reset link has been sent to your email address. Please check your inbox.');
                        showNotification('forgot password', 'A reset link has been sent to your email address. Please check your inbox.');
                    }
                    console.log("res:", response);
                } catch(err) {
                    console.error(err)
                    if(err.response?.status === 400 || err.response?.status === 404) {
                        setErrorMsg('User with this email not found');
                    } else {
                        setErrorMsg('Server error, please try again later');
                    }
                }
            }
        }
        setButtonClicked(false);
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
