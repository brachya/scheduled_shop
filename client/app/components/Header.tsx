import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='w-full bg-white'>
            <nav className='w-full flex gap-3 mx-4'>
                <Link className='bg-white text-black' href={"/"}>Home</Link>
                <Link className='bg-white text-black' href={"/login"}>Login</Link>
            </nav>
        </header>
    )
}

export default Header