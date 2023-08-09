import React, { useState } from 'react';
import LoadingButton from '../loading/LoadingButton';
import { CrossCancel, FolderGray } from '../../assets/SVGs';
import { toast } from 'react-hot-toast';

const CreateCollection = ({ toggleCreateCollection, setToggleCreateCollection }) => {

    const createCollection = (e) => {
        e.preventDefault()
        toast.success("Work in progress!", {
            style: {
                color: '#E49B0F'
            },
            icon: '⚠️'
        })
    }

    return (
        <div className={`absolute w-full h-fit top-11 right-0 flex justify-end p-5 px-3 md:mt-[.1rem] md:w-fit md:items-center overflow-hidden ${toggleCreateCollection ? 'z-50' : '-z-50'} duration-500`}>
            <div className={`bg-white w-full h-fit rounded-lg p-2 md:w-fit ${toggleCreateCollection ? 'translate-x-0' : 'translate-x-full'} duration-500 border-2 shadow-xl`}>
                <div className='inline-flex gap-5 items-center'>
                    <button onClick={() => setToggleCreateCollection(false)} className='p-2 bg-violet-100 rounded-md'>
                        <CrossCancel />
                    </button>
                    <span className='font-montserrat font-bold text-gray-600'>Upload Image</span>
                </div>
                <div className='h-[calc(100%_-_2rem)] p-1'>
                    <form className='relative mt-4' onSubmit={createCollection}>
                        <input
                            type="text"
                            name='collection'
                            required
                            pattern="\S(.*\S)?"
                            placeholder='Enter collection name'
                            maxLength="25"
                            className='p-3 bg-gray-100 rounded-xl mb-5 w-full ps-12 outline-none font-montserrat font-semibold hover:border-violet-500 focus:outline-violet-500 placeholder:font-normal placeholder:text-slate-500' />
                        <FolderGray />
                        <LoadingButton loading={loading} value="Create" width="full" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCollection;
