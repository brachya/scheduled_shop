"use client"
import React, { useState } from 'react'
import Form from '../components/Form';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
interface SignUpVals {
    email: string;
    password: string;
    name: string;
}

const FormHandle = () => {
    const [signUpVals, setSignUpVals] = useState<SignUpVals>({
        email: "",
        password: ""
    } as SignUpVals)
    const signUpHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/auth/register`, signUpVals, { withCredentials: true }).then(snap => {
            console.log(snap)
        })
    }
    const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setSignUpVals(old => { return { ...old, email: event.target.value } }) }
    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setSignUpVals(old => { return { ...old, password: event.target.value } }) }
    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => { setSignUpVals(old => { return { ...old, name: event.target.value } }) }
    const clickTest = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const data = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}`, { withCredentials: true })
        console.log(data)
    }
    return (
        <Form submit={signUpHandler} title='SignUp'>
            <Input val={signUpVals['email']} change={emailHandler} title='email' type='email' />
            <Input val={signUpVals['password']} change={passwordHandler} title='password' type='password' />
            <Input val={signUpVals['name']} change={nameHandler} title='name' type='name' />
            <Button id='signUpBtn' name='signUp' type='submit' />
            <Button id='protectedBtn' name='protected' click={clickTest} type='button' />
        </Form>
    )
}

export default FormHandle