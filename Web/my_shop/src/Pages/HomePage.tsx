import React from 'react';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/imageSlider';
import Features from '../components/features';
import ItemList1 from '../components/ItemList1';
import Banner1 from '../components/banner1';
import ItemList2 from '../components/itemList2';
import SocialLink from '../components/socialLink';
import Footer from '../components/footer';

export default function HomePage() {
    return (
        <div className="mx-auto">
            <Navbar />
            <ImageSlider />
            <Features />
            <ItemList1 />
            <Banner1 />
            <ItemList2 />
            <SocialLink />
            <Footer />
        </div>
    );
}
