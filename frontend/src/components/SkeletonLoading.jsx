import React from 'react'

function SkeletonLoading({ height = '20px', width = '100%',  style = {} }) {
    const defaultStyle = {
        height,
        width,
        borderRadius: '8px',
        backgroundColor: '#eee',
        ...style,
    };

    return <div style={defaultStyle} className="skeleton-box" />;
}

export default SkeletonLoading