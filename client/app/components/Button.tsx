import React from 'react'

const Button = ({ id, name, type, click }: { id: string, name: string, type: "submit" | "reset" | "button", click?: React.MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <div className="flex justify-center items-center">
            <button id={id} name={name} type={type} onClick={click} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>{name}</button>
        </div>
    )
}

export default Button