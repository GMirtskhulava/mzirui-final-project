import React from 'react'
import RouterPath from '../components/RouterPath'

function NotFoundPage() {
    return (
    <>
        <RouterPath/>
        <div className='notFound-page'>
            <h1 className=''>404 | Page not found</h1>
        </div>
    </>
    )
}

export default NotFoundPage