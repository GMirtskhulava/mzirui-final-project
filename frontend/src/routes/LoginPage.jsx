import { useState } from 'react';

import { RouterPath } from '../components/index.js';
import { Link } from 'react-router-dom';

import { loginUser } from '../api/UsersApi';

// import { useUserData } from '../context/UserContext';

function LoginPage() {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });
    const [errormsg, setErrorMsg] = useState('');
    // const { login } = useUserData();

    const handleFormChange = (e) => {
        setInputValues((p) => ({
            ...p,
            [e.target.name]: e.target.value,
        }));
    };
    const checkFormValidations = () => {
        if (inputValues.email === '' || inputValues.password === '')
            return false, setErrorMsg('Please fill all the fields');
        if (
            !inputValues.email.includes('@') ||
            inputValues.email.length < 5 ||
            inputValues.email.length > 50
        )
            return false, setErrorMsg('Please enter a valid email address');
        if (inputValues.password.length < 5 || inputValues.password.length > 20)
            return false, setErrorMsg('Please enter a valid Password [5-20 characters]');

        return true;
    };
    const hangleLoginButton = () => {
        setErrorMsg('');
        if (checkFormValidations()) {
            loginUser(inputValues.email, inputValues.password)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        // login(res.data.data);
                        window.location.href = '/';
                    }
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setErrorMsg('Invalid email or password');
                    } else {
                        setErrorMsg('Server error, please try again later');
                    }
                });
        } else return;
    };

    return (
        <>
            <RouterPath />
            <div className="login-page">
                <div className="login-page__form">
                    <h4 className="login-page__form__title">Login</h4>
                    <div className="login-page__form__inputs">
                        <div className="login-page__form__inputs__input-box">
                            <label htmlFor="email">Email Address*</label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={inputValues.email}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="login-page__form__inputs__input-box">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={inputValues.password}
                                onChange={handleFormChange}
                            />
                        </div>
                        <p className="login-page__form__inputs__error-msg">{errormsg}</p>
                        <div className="login-page__form__inputs__input-box-bottom">
                            <div className="login-page__form__inputs__input-box-bottom__checkbox">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                />
                                <label htmlFor="remember-me">Remember Me</label>
                            </div>
                            <Link to="/forgot-password">Forgot Password?</Link>
                            <br></br>
                            <Link to="/register">Don't have an account?</Link>
                        </div>
                        <div className="login-page__form__inputs__button-box">
                            <button onClick={hangleLoginButton}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
