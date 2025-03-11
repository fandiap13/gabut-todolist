import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'

const LoadingPageComponent = () => {
    return (
        <div className={`w-full h-full min-h-screen bg-gradient-to-bl from-[#1E1F26] to-[#363058] px-10 py-20 flex flex-col items-center justify-center text-white`}>
            <FaCircleNotch className="h-14 w-14 animate-spin mb-3" />

            <div className='font-semibold text-lg'>Loading...</div>
        </div>
    )
}

export default LoadingPageComponent