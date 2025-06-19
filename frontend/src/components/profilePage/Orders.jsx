import React from 'react'

import { SkeletonLoading } from '../index.js'

function Orders() {
    return (
    <div className='profile-orders'>
        <div className='profile-orders__title'>
            <h2>My Orders</h2>
        </div>
        <div className='profile-orders__content'>
            <table>
                <thead className='profile-orders__content__head'>
                    <tr>
                        <th className='profile-orders__content__head__order'>Order</th>
                        <th className='profile-orders__content__head__date'>Date</th>
                        <th className='profile-orders__content__head__status'>Status</th>
                        <th className='profile-orders__content__head__total'>Total</th>
                        <th className='profile-orders__content__head__view'></th>
                    </tr>
                </thead>
                <tbody className='profile-orders__content__body'>
                    <tr>
                        <td className='profile-orders__content__body__order'>
                            -
                        </td>
                        <td className='profile-orders__content__body__date'>
                            -
                        </td>
                        <td className='profile-orders__content__body__status'>
                            Orders not found
                        </td>
                        <td className='profile-orders__content__body__total'>
                            -
                        </td>
                        <td className='profile-orders__content__body__view'>
                            -
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Orders