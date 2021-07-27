import React, { useContext, useState } from 'react'
import { useHistory, Link, Redirect } from 'react-router-dom'
import { Usercontext } from '../Store/Userinfo'


export default function Login (){
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
            <div className="form">
                <form onSubmit={submit} action="">
                <label htmlFor="email">Email</label><br />
                <input required onChange={updateInputs} type="email" name="email" id="email" value={input.email}/><br />
                <label htmlFor="password">Password</label><br />
                <input required onChange={updateInputs} type="password" name="password" id="password"value={input.password} />
                <p className="error-notice">{error}</p>
                <input type="submit" value="log in"/>
                </form>
                <Link to="/register">register</Link>
            </div>
        )
    }
}