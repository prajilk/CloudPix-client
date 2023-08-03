import React from 'react'
import Card from './Card'
import ImageStack from './ImageStack';

const HeroSection = () => {

    // Generates a number between 0 to 1;
    Math.random();
    // to generate a random rounded number between 1 to 5;
    var theRandomNumber = Math.floor(Math.random() * 5) + 1;

    return (
        <div
            style={{ backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url('/bg/bg${theRandomNumber}.jpg')` }}
            className="md:min-h-screen bg-center bg-cover py-20 flex items-center">
            <div className='flex justify-between items-center max-w-6xl mx-auto'>
                <div className='hidden md:block shadow-2xl shadow-black'>
                    <ImageStack />
                </div>
                <div className='p-7 max-w-md hidden md:block shadow-2xl shadow-black'>
                    <h1 className='text-4xl font-bold text-white font-poppins'>Seamlessly Upload and Manage Your Extensive Photo Collection</h1>
                    <p className='font-montserrat text-white text-sm font-normal mt-3 mb-4'>Upload, organize, and effortlessly share your photos. Store and manage your memories without restrictions, while easily sharing them with loved ones. Simplify your photo journey with CloudPix</p>
                </div>
                <Card />
            </div>
        </div>
    )
}

export default HeroSection
