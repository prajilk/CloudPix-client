import React, { useState } from 'react';
import axiosConfig from '../../api/axios.config';
import LoadingButton from '../loading/LoadingButton';

const CreateCollection = ({ toggleCreateCollection, setToggleCreateCollection }) => {

    const [collection, setCollection] = useState("");
    const [loading, setLoading] = useState(false);

    const createCollection = (e) => {
        e.preventDefault()
        setLoading(true);
        axiosConfig.post("/create-collection", { collectionName: collection })
            .then((res) => {
                console.log("Collection created");
                setLoading(false);
                setToggleCreateCollection(false)
            })
            .catch((error) => {
                setLoading(false);
                setToggleCreateCollection(false)
                console.log(error);
            })
    }

    return (
        <div className={`absolute w-full h-fit top-11 right-0 flex justify-end p-5 px-3 md:mt-[.1rem] md:w-fit md:items-center overflow-hidden ${toggleCreateCollection ? 'z-50' : '-z-50'} duration-500`}>
            <div className={`bg-white w-full h-fit rounded-lg p-2 md:w-fit ${toggleCreateCollection ? 'translate-x-0' : 'translate-x-full'} duration-500 border-2 shadow-xl`}>
                <div className='inline-flex gap-5 items-center'>
                    <button onClick={() => setToggleCreateCollection(false)} className='p-2 bg-violet-100 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" id="IconChangeColor"> <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" strokeWidth="1" stroke="#000000"></path> </svg>
                    </button>
                    <span className='font-montserrat font-bold text-gray-600'>Upload Image</span>
                </div>
                <div className='h-[calc(100%_-_2rem)] p-1'>
                    <form className='relative mt-4' onSubmit={createCollection}>
                        <input
                            type="text"
                            value={collection}
                            name='collection'
                            required
                            pattern="\S(.*\S)?"
                            onChange={(e => setCollection(e.target.value))}
                            placeholder='Enter collection name'
                            maxLength="25"
                            className='p-3 bg-gray-100 rounded-xl mb-5 w-full ps-12 outline-none font-montserrat font-semibold hover:border-violet-500 focus:outline-violet-500 placeholder:font-normal placeholder:text-slate-500' />
                        <svg className='w-7 h-7 absolute top-2.5 left-2.5 fill-slate-400' viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M241.88037,110.64453A16.03934,16.03934,0,0,0,228.90039,104H216V88a16.01833,16.01833,0,0,0-16-16H130.667l-27.7334-20.7998A16.10323,16.10323,0,0,0,93.333,48H40A16.01833,16.01833,0,0,0,24,64V208a8.06184,8.06184,0,0,0,.04541.8457c.00293.02735.00928.0542.0127.08155a7.86829,7.86829,0,0,0,.13818.81543c.01562.07226.03711.14306.05517.21484.05665.22559.12159.44775.19727.665.02734.07812.05566.15527.08545.23242q.126.33033.28076.64551c.03076.064.05908.12842.09229.1914a7.98135,7.98135,0,0,0,1.01318,1.49952c.06055.07129.12451.13769.1875.20654.14063.15381.28662.30176.43945.44434.07276.06787.145.13525.22022.20068.17187.14844.3501.28808.53418.42187.05469.04.10693.084.16308.12207a7.91673,7.91673,0,0,0,.77246.47168c.0254.01368.05225.02442.07764.0376a7.86248,7.86248,0,0,0,.73779.33594c.07129.02832.14405.05322.2168.07959q.31715.11572.64649.20459c.085.023.16894.04541.25439.06543.21875.05127.44092.09131.666.124.08154.01221.16259.02783.24462.0376A8.04614,8.04614,0,0,0,32,216H208a8.00117,8.00117,0,0,0,7.58984-5.47021l28.48926-85.47022A16.03873,16.03873,0,0,0,241.88037,110.64453ZM93.333,64l27.7334,20.7998A16.10323,16.10323,0,0,0,130.667,88H200v16H146.42188a15.9479,15.9479,0,0,0-8.875,2.6875L117.57812,120H69.416a15.92344,15.92344,0,0,0-14.85547,10.05762L40,166.45947V64Z"></path> </g></svg>
                        <LoadingButton loading={loading} value="Create" width="full" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCollection;
