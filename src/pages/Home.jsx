import React from 'react'
import Header from '../components/homeComponent/Header'
import HeroSection from '../components/homeComponent/HeroSection'
import BodySection from '../components/homeComponent/BodySection'
import Footer from '../components/homeComponent/Footer'

const Home = () => {


    return (
        <div className='min-h-screen bg-slate-200'>
            <Header position="absolute" />
            <HeroSection />
            <BodySection />
            <Footer />
        </div>
    )
}

export default Home
