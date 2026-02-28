import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HomeCarousel from '../components/home/HomeCarousel';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProductsSummary from '../components/home/ProductsSummary';

const Home = () => {
    return (
        <div className="flex flex-col gap-0 overflow-x-hidden">
            <HomeCarousel />

            <AboutSection />
            <WhyChooseUs />

            <ProductsSummary />
            <HeroSection />
            <div className="h-16"></div>
        </div>
    );
};

export default Home;
