import React from 'react';

import RouterPath from '../components/RouterPath';

import Shipping from '../components/homePage/Shipping';
import CompanyInfo from '../components/aboutPage/CompanyInfo';
import OurTeam from '../components/aboutPage/OurTeam';

function AboutPage() {
    return (
        <>
            <RouterPath />
            <div className="about-page">
                <div className="about-page__our-story">
                    <h2>
                        Our <span>Story</span>
                    </h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis
                    </p>
                </div>
                <Shipping />
                <CompanyInfo />
                <OurTeam />
            </div>
        </>
    );
}

export default AboutPage;
