import React from 'react'

const Input = ({ type, placeholder, state, setState }) => {
    return (
        <input
            className="h-12 px-6 bg-gray-100 rounded-xl hover:border-violet-500 focus:outline-violet-500 placeholder:font-normal placeholder:text-slate-500"
            type={type}
            name={type}
            placeholder={placeholder}
            value={state}
            onChange={(e) => setState(e.target.value)}
            required />
    )
}

export default Input
