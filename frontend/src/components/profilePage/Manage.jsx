import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

import { useNotification } from '../../context/index.js';
import { useTranslation } from 'react-i18next';
import { SkeletonLoading } from '../index.js';
import AddProductModal from '../../modals/AddProductModal.jsx';


import { getUserById, getUserByName } from '../../api/UsersApi.js';
import { getProductById, getProductByName } from '../../api/ProductsApi.js';

function Afind() {
    const { i18n } = useTranslation();
    const { showNotification } = useNotification();

    const [userSearch, setUserSearch] = useState({
        value: '',
        result: null,
        loading: false,
    });

    const [productSearch, setProductSearch] = useState({
        value: '',
        result: null,
        loading: false,
    });

    const [showAddModal, setShowAddModal] = useState(false);

    const handleUserSearchChange = (e) => {
        setUserSearch(prev => ({
            ...prev,
            value: e.target.value
        }));
    };

    const handleProductSearchChange = (e) => {
        setProductSearch(prev => ({
            ...prev,
            value: e.target.value
        }));
    };

    const searchUser = async () => {
        if (userSearch.loading || userSearch.value.trim() === '') return;

        setUserSearch(prev => ({ ...prev, loading: true, result: null }));

        if (userSearch.value.length === 24 && !userSearch.value.includes(" ")) {
            try {
                const res = await getUserById(userSearch.value);
                setUserSearch(prev => ({
                    ...prev,
                    result: res?.data?.data ? [res.data.data] : [],
                    loading: false
                }));
            } catch (err) {
                console.error(err);
                setUserSearch(prev => ({ ...prev, result: [], loading: false }));
            }
        } else {
            try {
                const res = await getUserByName(userSearch.value);
                setUserSearch(prev => ({
                    ...prev,
                    result: res?.data?.data || [],
                    loading: false
                }));
            } catch (err) {
                console.error(err);
                setUserSearch(prev => ({ ...prev, result: [], loading: false }));
            }
        }
    };

    const searchProduct = async () => {
        if (productSearch.loading || productSearch.value.trim() === '') return;

        setProductSearch(prev => ({ ...prev, loading: true, result: null }));

        if (productSearch.value.length === 24 && !productSearch.value.includes(" ")) {
            try {
                const res = await getProductById(productSearch.value);
                setProductSearch(prev => ({
                    ...prev,
                    result: res?.data?.data ? [res.data.data] : [],
                    loading: false
                }));
            } catch (err) {
                console.error(err);
                setProductSearch(prev => ({ ...prev, result: [], loading: false }));
            }
        } else {
            try {
                const res = await getProductByName(productSearch.value);
                setProductSearch(prev => ({
                    ...prev,
                    result: res?.data?.data || [],
                    loading: false
                }));
            } catch (err) {
                console.error(err);
                setProductSearch(prev => ({ ...prev, result: [], loading: false }));
            }
        }

    };

    return (
        <>
            {showAddModal && (
                <AddProductModal onClose={() => setShowAddModal(false)} />
            )}
            <div className='profile-afind'>
                <div className='profile-afind__title'>
                    <h2>A-FIND</h2>
                </div>

                <div className='profile-afind__content'>
                    <div className='profile-afind__content__row'>
                        <label>Enter Username or ID:</label>
                        <div className='profile-afind__content__row__input-box'>
                            <input type='text' placeholder='User name / User ID' value={userSearch.value} onChange={handleUserSearchChange} />
                            <button onClick={searchUser}>Find</button>
                        </div>
                        <div className='profile-afind__content__row__find-result'>
                            {
                                userSearch.loading ? (<p>Loading...</p>)
                                    : userSearch.result?.length === 0 ? (
                                        <>
                                            <h3 className='profile-afind__content__row__find-result__title'>Search Result:</h3>
                                            <p>User not found</p>
                                        </>
                                    ) : userSearch.result?.length > 0 ? (
                                        <>
                                            <h3 className='profile-afind__content__row__find-result__title'>Search Result:</h3>
                                            <div className='profile-afind__content__row__find-result__list'>
                                                <ul>
                                                    {userSearch.result.map(user => (
                                                        <li key={user._id}>
                                                            <Link to={`/profile/${user._id}`}>{user.username}</Link> |
                                                            <span> ID: <span>{user._id}</span>
                                                                <CopyToClipboard text={user._id}>
                                                                    <span><i className="fa-solid fa-copy wishlist-page__body__product__adm-id__copy"></i></span>
                                                                </CopyToClipboard>
                                                            </span>
                                                            {user.admin && <span className='admin-badge badge'>[Admin]</span>}
                                                            {user.banned && <span className='red-badge badge'>[Banned]</span>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
                                    ) : null
                            }
                        </div>
                    </div>

                    <div className='profile-afind__content__row'>
                        <label>Enter Product Name or ID:</label>
                        <div className='profile-afind__content__row__input-box'>
                            <input type='text' placeholder='Product name / Product ID' value={productSearch.value} onChange={handleProductSearchChange} />
                            <button onClick={searchProduct}>Find</button>
                        </div>
                        <div className='profile-afind__content__row__find-result'>
                            {
                                productSearch.loading ? (<p>Loading...</p>)
                                    : productSearch.result?.length === 0 ? (
                                        <>
                                            <h3 className='profile-afind__content__row__find-result__title'>Result:</h3>
                                            <p>Product not found</p>
                                        </>
                                    ) : productSearch.result?.length > 0 ? (
                                        <>
                                            <h3 className='profile-afind__content__row__find-result__title'>Result:</h3>
                                            <div className='profile-afind__content__row__find-result__list'>
                                                <ul>
                                                    {productSearch.result.map(product => (
                                                        <li key={product._id}>
                                                            <Link to={`/product/${product._id}`}>{product.title[i18n.language]}</Link> |
                                                            <span> ID: <span>{product._id}</span>
                                                                <CopyToClipboard text={product._id}>
                                                                    <span><i className="fa-solid fa-copy wishlist-page__body__product__adm-id__copy"></i></span>
                                                                </CopyToClipboard>
                                                            </span>
                                                            {product.hidden && <span className='red-badge badge'>[Unavailable]</span>}
                                                            {!product.countInStock && <span className='red-badge badge'>(Out of Stock)</span>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
                                    ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-manage'>
                <div className='profile-manage__title'>
                    <h2>Manage</h2>
                </div>

                <div className='profile-manage__content'>
                    <div className='profile-manage__content__row'>
                        <label>Products:</label>
                        <div className='profile-manage__content__row__input-box'>
                            <button onClick={()=>setShowAddModal(true)}>Add Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Afind;
