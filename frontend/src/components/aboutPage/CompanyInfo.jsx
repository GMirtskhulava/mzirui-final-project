import React from 'react'

function CompanyInfo() {
    return (
    <>
        <div className='about-page__video'>
            <video controls>
                <source src="https://videos.pexels.com/video-files/1494252/1494252-hd_1920_1080_24fps.mp4"></source>
            </video>
        </div>
        <div className='about-page__counter'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing <br />elit, sed do <span>eiusmod tempor</span> incididunt.</p>
            <div className='about-page__counter__list'>
                <div className='about-page__counter__list__column'>
                    <h2>150+</h2>
                    <p>Projects</p>
                </div>
                <div className='about-page__counter__list__column'>
                    <h2>150+</h2>
                    <p>Projects</p>
                </div>
                <div className='about-page__counter__list__column'>
                    <h2>150+</h2>
                    <p>Projects</p>
                </div>
                <div className='about-page__counter__list__column'>
                    <h2>150+</h2>
                    <p>Projects</p>
                </div>
            </div>
        </div>
    </>
    )
}

export default CompanyInfo