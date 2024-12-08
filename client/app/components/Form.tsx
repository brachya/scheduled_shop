import React from 'react'

const Form = ({ children, title, submit }: { children: React.ReactNode, title: string, submit?: (event: React.FormEvent) => void }) => {
    return (
        <form onSubmit={submit} className='space-y-6'>
            <h1 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>{title}</h1>
            {children}
        </form>
    )
}

export default Form