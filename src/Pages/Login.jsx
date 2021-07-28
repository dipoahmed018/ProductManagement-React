import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, Link, Redirect } from 'react-router-dom'
import { Usercontext } from '../Store/Userinfo'


export default function Login (){
    const {user, setUser} = useContext(Usercontext)
    const history = useHistory()
    const [error, setError] = useState('')
    const [input, setInput] = useState({email : 'email', password : 'password'})
    const input_password = useRef()
    const error_box = useRef()
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
    const changePasswordVIsibility = (e) => {
        if (e.target.classList.contains('bi-eye-slash')) {
            e.target.classList.remove('bi-eye-slash')
            e.target.classList.add('bi-eye')
            input_password.current.type = 'password'
            
        } else {
            e.target.classList.add('bi-eye-slash')
            e.target.classList.remove('bi-eye')
            input_password.current.type = 'text'

        }
    }
    useEffect(() => {
        if(error.length < 1){
            error_box.current.classList.add('hide')
        } else {
           error_box.current.classList.remove('hide') 
        }
        setUser({email : input.email, password : input.password, name: 'dipo'}, history.push('/'))
    }, [error])

    if (typeof user == 'object') {
        return <Redirect to="/"/>
    } else {
        return (
            <div className="form login">
                <form onSubmit={submit} action="">
                <label htmlFor="email">Email</label><br />
                <input required onChange={updateInputs} type="email" name="email" id="email" value={input.email}/><br />
                <label htmlFor="password">Password</label><br />
                <div className="password-block">
                <input ref={input_password} required onChange={updateInputs} type="password" name="password" id="password"value={input.password} />
                <i onClick={changePasswordVIsibility} className="bi bi-eye"></i>
                </div>
                <div ref={error_box} className="error-notice">{error}<i className="bi bi-x-circle" onClick={() => setError('')}></i></div>
                <div className="buttons">
                <input type="submit" value="log in"/>
                <Link to="/register"> <button  className="form-link-button">register <i className="bi bi-box-arrow-up-right"></i></button></Link>
                </div>
                </form>
            </div>
        )
    }
}