import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { resetPasswordUser, checkResetTokenValidation } from '../api/UsersApi';

import { SkeletonLoading } from '../components/index.js';

function ResetPasswordPage() {
    const [inputValues, setInputValues] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [errormsg, setErrorMsg] = useState('');
    const [isTokenFound, setIsTokenFound] = useState();
    const [buttonClicked, setButtonClicked] = useState(false);

    const { token } = useParams();

    const handleFormChange = (e) => {
        setInputValues((p) => ({
            ...p,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await checkResetTokenValidation(token);
                setIsTokenFound(res.status === 200);
            } catch {
                setIsTokenFound(false);
            }
        };

        fetchData();
    }, [token]);

    const checkFormValidations = () => {
        if (inputValues.newPassword === '' || inputValues.confirmPassword === '')
            return false, setErrorMsg('Please fill all the fields');
        if (inputValues.newPassword.length < 5 || inputValues.newPassword.length > 20)
            return false, setErrorMsg('Please enter a valid Password [5-20 characters]');
        if (inputValues.confirmPassword !== inputValues.newPassword)
            return false, setErrorMsg('New Password and Confirm Password do not match');

        return true;
    };

    const handleResetPasswordButton = async () => {
        if (buttonClicked) return;
        setButtonClicked(true);
        setErrorMsg('');
        if (checkFormValidations()) {
            try {
                const response = await resetPasswordUser(inputValues.newPassword, token);
                if (response.status === 200) {
                    window.location.href = '/login';
                }
                else {
                    console.log(response.data);
                    setErrorMsg('Something went wrong, please try again later');
                }
            } catch(err) {
                console.error(err);
                if (err.response?.status === 401) {
                    setErrorMsg('Invalid or expired token');
                } else if (err.response?.status === 404) {
                    setErrorMsg('User with this email does not exist');
                } else {
                    setErrorMsg('Server error, please try again later');
                }
            }
        } 
        setButtonClicked(false);
    };
    return (
        <div className="resetPassword-page">
            <div className="resetPassword-page__form">
                <h4 className="resetPassword-page__form__title">Reset Password</h4>
                <div className="resetPassword-page__form__inputs">
                    {isTokenFound === true ? (
                        <>
                            <div className="resetPassword-page__form__inputs__input-box">
                                <label htmlFor="password">New Password</label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    value={inputValues.newPassword}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="resetPassword-page__form__inputs__input-box">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={inputValues.confirmPassword}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <p className="resetPassword-page__form__inputs__error-msg">
                                {errormsg}
                            </p>
                            <div className="resetPassword-page__form__inputs__button-box">
                                <button onClick={handleResetPasswordButton}>Reset Password</button>
                            </div>
                        </>
                    ) : isTokenFound === false ? (
                        <p className="resetPassword-page__form__inputs__invalid-token-txt">
                            Invalid or Expired Token
                        </p>
                    ) : (
                        <div className="resetPassword-page__form__inputs__skeletons">
                            <SkeletonLoading
                                height="30px"
                                style={{ marginBottom: '12px' }}
                            />
                            <SkeletonLoading
                                height="30px"
                                style={{ marginBottom: '12px' }}
                            />
                            <SkeletonLoading
                                height="20px"
                                style={{ marginBottom: '12px' }}
                            />
                            <SkeletonLoading
                                height="35px"
                                width="120px"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
