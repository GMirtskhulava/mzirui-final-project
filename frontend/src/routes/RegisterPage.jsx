import { useState } from 'react';

import { RouterPath } from '../components/index.js';
import { Link } from 'react-router-dom';

import { registerUser } from '../api/UsersApi';

function RegisterPage() {
    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errormsg, setErrorMsg] = useState('');

    const handleFormChange = (e) => {
        setInputValues((p) => ({
            ...p,
            [e.target.name]: e.target.value,
        }));
    };
    const checkFormValidations = () => {
        if (
            inputValues.firstName === '' ||
            inputValues.lastName === '' ||
            inputValues.email === '' ||
            inputValues.password === '' ||
            inputValues.confirmPassword === ''
        )
            return false, setErrorMsg('Please fill all the fields');
        if (inputValues.firstName.length < 2 || inputValues.firstName.length > 20)
            return false, setErrorMsg('First name should be between 2-20 characters');
        if (inputValues.lastName.length < 3 || inputValues.firstName.length > 50)
            return false, setErrorMsg('Last name should be between 3-50 characters');
        if (
            !inputValues.email.includes('@') ||
            inputValues.email.length < 5 ||
            inputValues.email.length > 50
        )
            return false, setErrorMsg('Please enter a valid email address');
        if (inputValues.password.length < 5 || inputValues.password.length > 20)
            return false, setErrorMsg('Please enter a valid Password [5-20 characters]');
        if (inputValues.confirmPassword !== inputValues.password)
            return false, setErrorMsg('Password and Confirm Password do not match');
        return true;
    };

    const handleRegisterButton = () => {
        setErrorMsg('');
        if (checkFormValidations()) {
            registerUser(
                `${inputValues.firstName} ${inputValues.lastName}`,
                inputValues.email,
                inputValues.password
            )
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        // window.location.href = '/';
                    }
                })
                .catch((err) => {
                    setErrorMsg(err.response.data.err);
                });
        } else return;
    };
    return (
        <>
            <RouterPath />
            <div className="reg-page">
                <div className="reg-page__form">
                    <h4 className="reg-page__form__title">Register</h4>
                    <div className="reg-page__form__inputs">
                        <div className="reg-page__form__inputs__input-row">
                            <div className="reg-page__form__inputs__input-row__box">
                                <label htmlFor="f-name">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    id="f-name"
                                    name="firstName"
                                    value={inputValues.firstName}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="reg-page__form__inputs__input-row__box">
                                <label htmlFor="l-name">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    id="l-name"
                                    name="lastName"
                                    value={inputValues.lastName}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                        <div className="reg-page__form__inputs__input-box">
                            <label htmlFor="email">Email Address*</label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={inputValues.email}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="reg-page__form__inputs__input-row">
                            <div className="reg-page__form__inputs__input-row__box">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={inputValues.password}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="reg-page__form__inputs__input-row__box">
                                <label htmlFor="c-password">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    id="c-password"
                                    name="confirmPassword"
                                    value={inputValues.confirmPassword}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                        <p className="reg-page__form__inputs__error-msg">{errormsg}</p>
                        <div className="reg-page__form__inputs__input-box-bottom">
                            <Link to="/login">Already have an account?</Link>
                        </div>
                        <div className="reg-page__form__inputs__button-box">
                            <button onClick={handleRegisterButton}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
