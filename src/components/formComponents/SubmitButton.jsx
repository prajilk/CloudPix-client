import React from 'react'
import { SpinnerThirdLarge } from '../../assets/SVGs';

const SubmitButton = ({ value, loading }) => {
    return (
        <button
            className="h-12 px-6 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-semibold cursor-pointer disabled:bg-violet-600 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}>
            {
                loading ?
                    <SpinnerThirdLarge /> :
                    value
            }
        </button>
    )
}

export default SubmitButton;
