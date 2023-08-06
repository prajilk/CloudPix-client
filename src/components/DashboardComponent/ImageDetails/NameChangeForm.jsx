import React, { useContext, useMemo, useState } from 'react'
import axiosConfig from '../../../api/axios.config';
import toast from "react-hot-toast"
import { UploadsContext } from '../../../context/uploadsContext';
import { SpinnerThird } from '../../../assets/SVGs';

const NameChangeForm = ({ filename, imageId, setIsOpen }) => {

    const [exactName, setExactName] = useState(getExactName(filename));
    const [loading, setLoading] = useState(false);
    const { setUploads } = useContext(UploadsContext); // Get uploads state from UploadContext (contains all uploads)

    function getExactName(filename) {
        const lastIndex = filename.lastIndexOf('.');
        const name = filename.substring(0, lastIndex);
        return name;
    }

    const fileExtension = useMemo(() => {
        const lastIndex = filename.lastIndexOf(".");
        const extension = filename.substring(lastIndex + 1);
        return extension;
    }, [filename])

    const changeFileName = (e) => {
        e.preventDefault();
        setLoading(true);
        if (exactName === getExactName(filename)) {
            setLoading(false);
            return toast.error("Same name, choose another.")
        }
        axiosConfig.post("/change-filename", { filename: exactName + "." + fileExtension, imageId })
            .then((res) => {
                toast.success("File name updated successfully!");
                setLoading(false);
                setUploads(prevUpload => {
                    return prevUpload.map((imagesObj) => {
                        if (imagesObj._id === res.data._id) {
                            return { ...imagesObj, filename: res.data.updatedName, url: res.data.updatedUrl };
                        } else {
                            return imagesObj;
                        }
                    })
                });
                setIsOpen(false); // Close modal after change
            })
            .catch(({ response }) => {
                if (response.data.message.message === "Cannot read properties of null (reading 'url')")
                    toast.error("Failed to change filename! Try different name.")
                else
                    toast.error("Failed to change filename!")
                setLoading(false)
            })
    }

    return (
        <form className='flex gap-3 p-2 text-sm' onSubmit={changeFileName}>
            <input
                className='w-full bg-gray-100 px-3 py-2 rounded-lg hover:border-violet-500 focus:outline-violet-500'
                type="text"
                name='filename'
                onChange={e => setExactName(e.target.value)}
                value={exactName} />
            <button
                type='submit'
                disabled={exactName === getExactName(filename)}
                className='bg-violet-500 px-2 py-1 w-20 rounded-full text-white font-montserrat font-semibold text-xs cursor-pointer hover:bg-violet-600 disabled:cursor-not-allowed'>
                {
                    loading ?
                        <SpinnerThird /> :
                        "Save"
                }
            </button>
        </form>
    )
}

export default NameChangeForm
