import React from 'react'
import Link from 'next/link'
import FormHandle from './FormHandle'
const Login = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <Link href={'/signup'}>signup</Link>
            <FormHandle />

        </div>
    )
}

export default Login