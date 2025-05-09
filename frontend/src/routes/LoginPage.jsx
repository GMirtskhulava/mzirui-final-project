import React from 'react';

import RouterPath from '../components/RouterPath';
import { Link } from 'react-router-dom';

function LoginPage() {
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
                            />
                        </div>
                        <div className="login-page__form__inputs__input-box">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="login-page__form__inputs__input-box-bottom">
                            <div className="login-page__form__inputs__input-box-bottom__checkbox">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                />
                                <label htmlFor="remember-me">Remember Me</label>
                            </div>
                            <Link to="/register">Forgotten Password?</Link>
                        </div>
                        <div className="login-page__form__inputs__button-box">
                            <button>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
