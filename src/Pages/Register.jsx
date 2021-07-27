import React, {useContext, useState} from 'react'
import {Link, useHistory, Redirect} from 'react-router-dom'
import { Usercontext } from '../Store/Userinfo'
export default function Register (){
    const {user, setUser} = useContext(Usercontext)
    const history = useHistory()
    const [error, setError] = useState()
    const [input, setInput] = useState({email : 'email', password : 'password'})
    const updateInputs = (e) => {
        const {target : {name}, target : {value} } = e
        setInput((prev) => ({...prev, [name] : value }))
    }
    const submit = (e) => {
        e.preventDefault()
        if (input.email.length < 1) {
            setError('please provide you email address')
            return;
        }
        if(input.password.length < 1){
            setError('please provide you password')
            return;
        }
        setUser({email : input.email, password : input.password, name: 'dipo'}, history.push('/'))
        
    }

    if (typeof user == 'object') {
        return <Redirect to="/"/>
    } else {        
        return (
        <div id="register">
            <form onSubmit={submit} action="/register" method="post">
                <label htmlFor="name">name</label><br />
                <input onChange={(e) => updateInputs(e)} type="text" name="name" id="name" /><br />
                <label htmlFor="email">email</label><br />
                <input onChange={(e) => updateInputs(e)} type="email" name="email" id="email" /><br />
                <label htmlFor="password">password</label><br />
                <input onChange={(e) => updateInputs(e)} type="password" name="password" id="password" /><br />
                <input type="submit" value="sign up" />
                <Link to="/login">log in</Link>
            </form>
        </div>
        )
    }
}