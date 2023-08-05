import React from 'react'
import { SpinnerThirdLarge } from '../../assets/SVGs'

const LoadingButton = ({ loading, value, onClickFunction, disabled, width }) => {
    return (
        <button
            style={{ WebkitTapHighlightColor: "transparent" }}
            className={`w-${width} h-12 rounded-full font-semibold bg-violet-500 hover:bg-violet-600 hover:-translate-y-2 duration-500 text-white mx-auto font-montserrat cursor-pointer px-6 disabled:cursor-not-allowed disabled:bg-slate-400`}
            type="submit"
            onClick={onClickFunction}
            disabled={disabled ? disabled : loading}>
            {
                loading ?
                    <SpinnerThirdLarge /> :
                    value
            }
        </button>
    )
}

export default LoadingButton
