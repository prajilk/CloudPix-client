import React, { useState } from 'react'
import FileUpload from './FileUpload'
import CreateCollection from './CreateCollection'

const UploadCard = () => {

    const [toggleFileUpload, setToggleFileUpload] = useState(false)
    const [toggleCreateCollection, setToggleCreateCollection] = useState(false)

    return (
        <>
            <div className='flex justify-between md:flex-col'>
                <div onClick={() => setToggleCreateCollection(true)} className='bg-white p-3 text-xs rounded-lg text-violet-500 shadow-lg font-montserrat font-bold flex items-center justify-center w-fit cursor-pointer md:w-fit md:text-sm md:gap-3 md:shadow-xl md:mb-5'>
                    <svg className='w-7 h-7 mr-1 fill-violet-500' viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M241.88037,110.64453A16.03934,16.03934,0,0,0,228.90039,104H216V88a16.01833,16.01833,0,0,0-16-16H130.667l-27.7334-20.7998A16.10323,16.10323,0,0,0,93.333,48H40A16.01833,16.01833,0,0,0,24,64V208a8.06184,8.06184,0,0,0,.04541.8457c.00293.02735.00928.0542.0127.08155a7.86829,7.86829,0,0,0,.13818.81543c.01562.07226.03711.14306.05517.21484.05665.22559.12159.44775.19727.665.02734.07812.05566.15527.08545.23242q.126.33033.28076.64551c.03076.064.05908.12842.09229.1914a7.98135,7.98135,0,0,0,1.01318,1.49952c.06055.07129.12451.13769.1875.20654.14063.15381.28662.30176.43945.44434.07276.06787.145.13525.22022.20068.17187.14844.3501.28808.53418.42187.05469.04.10693.084.16308.12207a7.91673,7.91673,0,0,0,.77246.47168c.0254.01368.05225.02442.07764.0376a7.86248,7.86248,0,0,0,.73779.33594c.07129.02832.14405.05322.2168.07959q.31715.11572.64649.20459c.085.023.16894.04541.25439.06543.21875.05127.44092.09131.666.124.08154.01221.16259.02783.24462.0376A8.04614,8.04614,0,0,0,32,216H208a8.00117,8.00117,0,0,0,7.58984-5.47021l28.48926-85.47022A16.03873,16.03873,0,0,0,241.88037,110.64453ZM93.333,64l27.7334,20.7998A16.10323,16.10323,0,0,0,130.667,88H200v16H146.42188a15.9479,15.9479,0,0,0-8.875,2.6875L117.57812,120H69.416a15.92344,15.92344,0,0,0-14.85547,10.05762L40,166.45947V64Z"></path> </g></svg>
                    Create collection
                </div>
                <div onClick={() => setToggleFileUpload(true)} className='bg-white p-3 text-xs rounded-lg text-violet-500 shadow-lg font-montserrat font-bold flex items-center justify-center w-fit cursor-pointer md:w-fit md:flex-col md:px-10 md:py-20 md:text-sm md:gap-2 md:shadow-xl'>
                    <svg viewBox="0 0 24 24" className='w-7 h-7 md:w-10 md:h-10 md:bg-violet-500 md:rounded-full' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" className='stroke-violet-500 md:stroke-white' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    Upload Images
                </div>
            </div>
            <CreateCollection toggleCreateCollection={toggleCreateCollection} setToggleCreateCollection={setToggleCreateCollection} />
            <FileUpload toggleFileUpload={toggleFileUpload} setToggleFileUpload={setToggleFileUpload} />
        </>
    )
}

export default UploadCard
