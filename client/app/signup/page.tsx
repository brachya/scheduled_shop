import React from 'react'
import Form from '../components/Form'
import Button from '../components/Button'
import Input from '../components/Input'
import Link from 'next/link'

const SignUp = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <Link href={'/login'}>login</Link>
            <Form title='SignUp'>
                <Input title='email' type='email' />
                <Input title='password' type='password' />
                <Button type='submit' />
            </Form>
        </div>

    )
}

export default SignUp