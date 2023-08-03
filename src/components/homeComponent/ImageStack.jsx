import React from 'react'

const ImageStack = () => {

    // Generates a number between 0 to 1;
    Math.random();
    // to generate a random rounded number between 1 to 3;
    var theRandomNumber = Math.floor(Math.random() * 3) + 1;

    return (
        <div className='relative w-full'>
            <div className='w-64 h-fit inset-0 mx-auto'>
                <img src={`/imageStack/${theRandomNumber}.png`} alt="..." />
            </div>
        </div>
    )
}

export default ImageStack