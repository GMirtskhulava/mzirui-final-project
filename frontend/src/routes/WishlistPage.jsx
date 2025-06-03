import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { RouterPath, SkeletonLoading } from '../components/index.js'

import { useUserData } from '../context/UserContext'
import { useProductsData } from '../context/ProductsContext.jsx'
import { useWishlistData } from '../context/WishlistContext.jsx';


import i18n from 'i18next'

function WishlistPage() {
    const { loggedIn, userData } = useUserData();
    const { productsData } = useProductsData();
    const { wishlistData, isInWishlist, removeWishlistItem } = useWishlistData();

    const [wishlistProducts, setWishlistProducts] = useState();
    

    useEffect(() => {
        if(!productsData || !wishlistData) return;

        const matchedProducts = productsData.filter(product => wishlistData.includes(product._id));
        setWishlistProducts(matchedProducts);
    }, [wishlistData, productsData, loggedIn, userData]);


    const removeFromWishlist = async (productId) => {
        if(!isInWishlist(productId)) return console.log("Not in wishlist");
        if(!loggedIn) {
            removeWishlistItem(productId);
        }
        else {
            // console.log(await removeWishlistItem(productId, userData._id))
            if(await removeWishlistItem(productId, userData._id)) {
                console.log("Removed successfully");
                // notification samomavlod
            }
            else {
                console.log("Failed to remove item from wishlist");
            }
        }
    }


    return (
        <>
            <RouterPath />
            <div className='wishlist-page'>
                <table>
                    <thead className='wishlist-page__head'>
                        <tr>
                            <th className='wishlist-page__head__remove'>Remove</th>
                            <th className='wishlist-page__head__image'>Image</th>
                            <th className='wishlist-page__head__product'>Product</th>
                            <th className='wishlist-page__head__unit-price'>Unit Price</th>
                            <th className='wishlist-page__head__stock-status'>Stock Status</th>
                            <th className='wishlist-page__head__add-to-cart'>Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody className='wishlist-page__body'>
                        {
                            wishlistProducts === undefined ? (
                                <tr>
                                    <td className='wishlist-page__body__remove'>
                                        <SkeletonLoading width='100%' height='50px' />
                                    </td>
                                    <td>
                                        <SkeletonLoading width='100%' height='8rem' />
                                    </td>
                                    <td className='wishlist-page__body__product'>
                                        <SkeletonLoading width='100%' height='2rem' />
                                    </td>
                                    <td className='wishlist-page__body__unit-price'>
                                        <SkeletonLoading width='100%' height='2rem' />
                                    </td>
                                    <td className='wishlist-page__body__stock-status'>
                                        <SkeletonLoading width='100%' height='2rem' />
                                    </td>
                                    <td className='wishlist-page__body__add-to-cart'>
                                        <SkeletonLoading width='100%' height='4rem' />
                                    </td>
                                </tr>
                            ) : wishlistProducts && wishlistProducts.length === 0 ? (
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>Products not Found</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            ) : wishlistProducts.map((product) => (
                                <tr key={product._id} className={product.hidden ? "hidden-product" : ""}>
                                    <td className='wishlist-page__body__remove'>
                                        <button className='wishlist-page__body__remove__btn' disabled={product.hidden} onClick={() => removeFromWishlist(product._id)}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                    <td className='wishlist-page__body__image'>
                                        <Link to={product.hidden ? '' : `/product/${product._id}`} ><img src={product.image["small"]} alt="Product" /></Link>
                                    </td>
                                    <td className='wishlist-page__body__product'>
                                        <Link to={product.hidden ? '' : `/product/${product._id}`} >{product.title[i18n.language]}</Link>
                                        {product.hidden && <span className="hidden-product-label">[Unavailable]</span>}
                                    </td>
                                    <td className='wishlist-page__body__unit-price'>
                                        ${product.hidden ? '-' : product.price}
                                    </td>
                                    <td className={`wishlist-page__body__stock-status ${product.hidden ? '' : product.countInStock > 0 ? '' : 'out-of-stock'}`}>
                                        {product.hidden ? '-' : product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </td>
                                    <td className='wishlist-page__body__add-to-cart'>
                                        <button className='wishlist-page__body__add-to-cart__btn' disabled={product.hidden}>Add to Cart</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default WishlistPage