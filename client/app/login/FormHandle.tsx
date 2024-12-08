"use client"
import React, { useState } from 'react'
import Form from '../components/Form';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
interface LoginVals {
    email: string;
    password: string;
}

const FormHandle = () => {
    const [loginVals, setLoginVals] = useState<LoginVals>({
        email: "",
        password: ""
    } as LoginVals)
    const loginHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, loginVals, { withCredentials: true }).then(snap => {
            console.log(snap)
        })
    }
    const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setLoginVals(old => { return { ...old, email: event.target.value } }) }
    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setLoginVals(old => { return { ...old, password: event.target.value } }) }
    const clickTest = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const data = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}`, { withCredentials: true })
        console.log(data)
    }
    return (
        <Form submit={loginHandler} title='Login'>
            <Input val={loginVals['email']} change={emailHandler} title='email' type='email' />
            <Input val={loginVals['password']} change={passwordHandler} title='password' type='password' />
            <Button id='loginBtn' name='login' type='submit' />
            <Button id='protectedBtn' name='protected' click={clickTest} type='button' />
        </Form>
    )
}

export default FormHandle