import React from 'react'

const MainLoading = () => {

    return (
        <div className={`absolute w-full h-screen bg-white top-0`}>
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 mx-auto mt-[90%]"></div>
        </div>
    )
}

export default MainLoading
