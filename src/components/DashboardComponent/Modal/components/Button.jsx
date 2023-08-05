import React from 'react'
import { SpinnerThird } from '../../../../assets/SVGs'

const Button = ({ loading, oldValue = 'old', value = 'new' }) => {
    return (
        <button
            type='submit'
            disabled={oldValue === value}
            className='bg-violet-500 px-2 py-2 h-fit w-20 rounded-full text-white font-montserrat font-semibold text-xs cursor-pointer hover:bg-violet-600 disabled:cursor-not-allowed'>
            {
                loading ?
                    <SpinnerThird /> :
                    "Save"
            }
        </button>
    )
}

export default Button
