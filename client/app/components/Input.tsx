import React from 'react'

const Input = ({ title, val, change, type = "text" }: { title: string, type?: React.HTMLInputTypeAttribute, val: string, change: React.ChangeEventHandler<HTMLInputElement> }) => {
    return (
        <label className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <span className='block text-sm/6 font-medium text-gray-900'>{title}</span>
            <input name={title} value={val} onChange={change} className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' type={type} />
        </label>
    )
}

export default Input