import React, { useState } from 'react'

const ShowDetails = ({ setShowModal, image }) => {

    const [copyText, setCopyText] = useState(false);

    // Reform image size to MB or KB
    const getSize = (bytes) => {
        const mb = (bytes / (1024 * 1024)).toFixed(2);
        if (Math.floor(mb) === 0) {
            return (bytes / 1024).toFixed(2) + "Kb"
        } else {
            return mb + "Mb"
        }
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-full mx-6 sm:w-[30%] md:w-[25%]">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                            <button className="p-1 ml-auto focus:outline-none" onClick={() => setShowModal(false)}>
                                <svg fill="#000000" version="1.1" className='w-3 h-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto px-4 py-2">
                            <p className="my-1 text-slate-500 text-md leading-relaxed font-montserrat">
                                Filename: &nbsp;
                                <span className='font-bold'>{image.filename}</span>
                            </p>
                            <p className="my-1 text-slate-500 text-md leading-relaxed font-montserrat">
                                Size: &nbsp;
                                <span className='font-bold'>{getSize(image.size)}</span>
                            </p>
                            <p className="my-1 text-slate-500 text-md leading-relaxed font-montserrat">
                                Date: &nbsp;
                                <span className='font-bold'>{new Date(image.date).toISOString().slice(0, 10)}</span>
                            </p>
                        </div>
                        {/*footer*/}
                        <div>
                            <a href={image.url} download rel="noopener noreferrer" target="_blank">
                                <div className='px-4 py-1 flex items-center border-t border-solid border-slate-200 hover:bg-slate-100 cursor-pointer'>
                                    <p className="my-1 text-slate-500 text-md leading-relaxed font-montserrat flex items-center gap-2">
                                        <svg viewBox="0 0 24 24" className='w-5 h-5' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                        <span className='font-bold'>Download</span>
                                    </p>
                                </div>
                            </a>
                            <div className='px-4 py-1 flex items-center border-t border-solid border-slate-200 hover:bg-slate-100 cursor-pointer'>
                                <p className="my-1 text-slate-500 text-md leading-relaxed font-montserrat flex items-center gap-2">
                                    <svg viewBox="0 0 24 24" className='w-5 h-5' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15.3097 5.30981L18.7274 8.72755" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    <span className='font-bold'>Rename</span>
                                </p>
                            </div>
                            <div className='px-4 py-1 flex items-center border-t border-solid border-slate-200 hover:bg-slate-100 cursor-pointer' onClick={() => { setCopyText(true); navigator.clipboard.writeText(image.url); }}>
                                <p className="my-1 text-slate-500 text-md leading-relaxed font-montserrat flex items-center gap-2">
                                    <svg className='w-5 h-5' viewBox="-1 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>share</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch: type="MSPage"> <g id="Icon-Set" sketch: type="MSLayerGroup" transform="translate(-312.000000, -726.000000)" fill="#000000"> <path d="M331,750 C329.343,750 328,748.657 328,747 C328,745.343 329.343,744 331,744 C332.657,744 334,745.343 334,747 C334,748.657 332.657,750 331,750 L331,750 Z M317,742 C315.343,742 314,740.657 314,739 C314,737.344 315.343,736 317,736 C318.657,736 320,737.344 320,739 C320,740.657 318.657,742 317,742 L317,742 Z M331,728 C332.657,728 334,729.343 334,731 C334,732.657 332.657,734 331,734 C329.343,734 328,732.657 328,731 C328,729.343 329.343,728 331,728 L331,728 Z M331,742 C329.23,742 327.685,742.925 326.796,744.312 L321.441,741.252 C321.787,740.572 322,739.814 322,739 C322,738.497 321.903,738.021 321.765,737.563 L327.336,734.38 C328.249,735.37 329.547,736 331,736 C333.762,736 336,733.762 336,731 C336,728.238 333.762,726 331,726 C328.238,726 326,728.238 326,731 C326,731.503 326.097,731.979 326.235,732.438 L320.664,735.62 C319.751,734.631 318.453,734 317,734 C314.238,734 312,736.238 312,739 C312,741.762 314.238,744 317,744 C318.14,744 319.179,743.604 320.02,742.962 L320,743 L326.055,746.46 C326.035,746.64 326,746.814 326,747 C326,749.762 328.238,752 331,752 C333.762,752 336,749.762 336,747 C336,744.238 333.762,742 331,742 L331,742 Z" id="share"> </path> </g> </g> </g></svg>
                                    <span className='font-bold'>Share &nbsp;
                                        {copyText && <span className='text-xs text-violet-400'>Copied to clipboard</span>}
                                    </span>
                                </p>
                            </div>
                            <div className='px-4 py-1 flex items-center border-t border-solid border-slate-200 hover:bg-slate-100 cursor-pointer'>
                                <p className="my-1 text-slate-500 text-md leading-relaxed font-montserrat flex items-center gap-2">
                                    <svg viewBox="0 0 24 24" className='w-5 h-5' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    <span className='font-bold'>Delete</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default ShowDetails
