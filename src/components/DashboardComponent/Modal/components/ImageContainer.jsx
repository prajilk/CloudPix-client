import React, { useState, useEffect } from 'react';
import heic2any from 'heic2any';
import { Loader } from '../../../../assets/SVGs';

const ImageContainer = ({ image }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageDataUrl, setImageDataUrl] = useState(null);

    useEffect(() => {
        const lastIndex = image.filename.lastIndexOf(".");
        const extension = image.filename.substring(lastIndex + 1);
        if (extension === 'heic') {
            fetch(image.url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => heic2any({
                    blob: new Blob([arrayBuffer], { type: 'image/heic' }),
                    toType: 'image/jpeg',
                }))
                .then(jpegBlob => {
                    const jpegDataUrl = URL.createObjectURL(jpegBlob);
                    setImageDataUrl(jpegDataUrl);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('HEIC to JPEG conversion failed:', error);
                    setIsLoading(false);
                });
        } else {
            setImageDataUrl(image.url);
            setIsLoading(false);
        }
    }, [image.url]);

    return (
        <div className="image-container">
            {isLoading || !imageDataUrl ? (
                <div className='h-full flex items-center'>
                    <Loader />
                </div>
            ) : (
                <img src={imageDataUrl} alt="Image" className='h-full' />
            )}
        </div>
    );
};

export default ImageContainer;