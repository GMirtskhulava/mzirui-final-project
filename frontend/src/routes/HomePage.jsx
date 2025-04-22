import React from 'react'

import Slider from "../components/homePage/Slider";
import Shipping from "../components/homePage/Shipping";
import OurProduct from "../components/homePage/OurProduct";
import Collections from '../components/homePage/Collections';
import ClientComments from '../components/homePage/ClientComments';
import Brands from '../components/homePage/Brands';
import LatestBlogs from '../components/homePage/LatestBlogs';

function HomePage() {
    return (
    <>
        <Slider />
        <Shipping />
        <OurProduct />
        <Collections />
        <ClientComments />
        <Brands />
        <LatestBlogs />
    </>
    )
}

export default HomePage