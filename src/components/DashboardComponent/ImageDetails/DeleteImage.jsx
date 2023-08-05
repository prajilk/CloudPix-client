import React, { useContext, useState } from 'react'
import axiosConfig from '../../../api/axios.config';
import toast from 'react-hot-toast';
import { UploadsContext } from '../../../context/uploadsContext';
import { SpinnerThird } from '../../../assets/SVGs';

const DeleteImage = ({ imageId, setIsOpen }) => {

    const { setUploads } = useContext(UploadsContext); // Get uploads state from UploadContext (contains all uploads)
    const [loading, setLoading] = useState(false);

    const deleteImage = () => {
        setLoading(true);
        axiosConfig.post('/delete-image', { imageId })
            .then((res) => {
                toast.success("Image deleted successfully!")
                setLoading(false);
                setUploads(prevUpload => prevUpload.filter((imagesObj) => imagesObj._id !== res.data._id));
                setIsOpen(false); // Close modal after deletion
            })
            .catch(() => {
                toast.error('Failed to delete image!')
                setLoading(false);
            })
    }

    return (
        <div className='flex items-center p-3 py-2 justify-between font-montserrat text-sm'>
            <span>Are you sure you want to delete?</span>
            <button
                onClick={deleteImage}
                type='button'
                disabled={loading}
                className='bg-red-500 px-3 py-2 w-20 rounded-md text-white cursor-pointer hover:bg-red-600 disabled:cursor-not-allowed'>
                {
                    loading ?
                        <SpinnerThird /> :
                        "Delete"
                }
            </button>
        </div>
    )
}

export default DeleteImage
