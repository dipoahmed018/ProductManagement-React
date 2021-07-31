import React, {useContext, useRef, useState, useEffect} from 'react'
import {Link, useHistory, Redirect} from 'react-router-dom'
import { Usercontext } from '../Store/Userinfo'
export default function Register (){
    const {user, setUser} = useContext(Usercontext)
    const history = useHistory()
    const [error, setError] = useState('')
    const [input, setInput] = useState({name : '',email : '', password : ''})
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
        if(input.password.length < 8){
            setError('password must be bigger than 8')
            return;
        }
        fetch('http://127.0.0.1:8000/api/user/register', {
            method : 'post', 
            body : JSON.stringify(input),
            mode : 'cors',
            headers : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
            }
        }).then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
            setUser(data.user)
            history.push('/')
        })
        .catch(err => {
           err.json().then(data => setError(data.message ?? 'something went wrong please try again'))
        })
    }
const changeVIsibility = (e) => {
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
}, [error])
    if (typeof user == 'object') {
        return <Redirect to="/"/>
    } else {        
        return (
            <form onSubmit={submit} action="/register" method="post" className="register">
                <label htmlFor="name">name</label><br />
                <input onChange={(e) => updateInputs(e)} type="text" name="name" id="name" /><br />

                <label htmlFor="email">email</label><br />
                <input onChange={(e) => updateInputs(e)} type="email" name="email" id="email" /><br />

                <label htmlFor="password">password</label><br />
                <div className="password-block">
                <input ref={input_password} required onChange={updateInputs} type="password" name="password" id="password"value={input.password} />
                <i onClick={changeVIsibility} className="bi bi-eye"></i>
                </div>

                <div ref={error_box} className="error-notice">{error}<i className="bi bi-x-circle" onClick={() => setError('')}></i></div>
                
                <div className="buttons">
                <input type="submit" value="sign up" />
                <Link to="/login"> <button className="form-link-button">log in <i className="bi bi-box-arrow-up-right"></i></button></Link>
                </div>
            </form>
        )
    }
}