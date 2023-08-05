import React from 'react'

const Input = ({ type, value, setValue, placeholder }) => {
    return (
        <input
            type={type}
            value={value}
            required
            onChange={(e) => setValue(e.target.value)}
            className='flex-1 px-3 py-2 rounded-md text-xs outline-none border-2 focus:border-violet-500'
            placeholder={placeholder} />
    )
}

export default Input
