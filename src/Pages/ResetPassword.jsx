import React, { useContext, useEffect, useRef, useState } from 'react'
import { Redirect, useLocation, useHistory } from 'react-router-dom'
import { Usercontext } from '../Store/Userinfo'


export default function ResetPassword (){
    const {user} = useContext(Usercontext)
    const location = useLocation()
    const history = useHistory()
    const [error, setError] = useState('')
    const [password, setPassword] = useState()
    const [token_email, setToken_Email] = useState()
    const error_box = useRef()
    const input_password = useRef()
    const submit = (e) => {
        e.preventDefault()
        const form = new FormData
        form.append('email', token_email.email)
        form.append('token', token_email.token)
        form.append('password', password)
        form.append('password_confirmation', password)
        fetch('http://127.0.0.1:8000/api/reset-password', {
            method : 'POST',
            mode : 'cors',
            body : form,
            headers : {
                'Accept' : 'application/json',
            }
        }).then(res => {
            return res.ok ? history.push('/') :Promise.reject(res)
        }).catch(err => {
            err.json().then(data => {
                setError(data.message ?? data.errors)
            })
        })
    }
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const email = params.get('email')
        const token = params.get('token')
        if (!email || !token) {
            history.push('/login')
        }
        setToken_Email({'email' : email, 'token' : token})
        if(error?.length < 1){
            error_box.current.classList.add('hide')
        } else {
           error_box.current.classList.remove('hide') 
        }
    }, [error])

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

    if (typeof user == 'object') {
        return <Redirect to="/"/>
    } else {
        return (
            <div className="form ResetPassword">
                <form onSubmit={submit} action="">
                <label htmlFor="password">New Password</label><br />
                <div className="password-block">
                <input ref={input_password} required onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
                <i onClick={changePasswordVIsibility} className="bi bi-eye"></i>
                </div>
                <div ref={error_box} className="error-notice">{error}<i className="bi bi-x-circle" onClick={() => setError('')}></i></div>
                <div className="buttons">
                <input type="submit" value="Reset Password"/>
                </div>
                </form>
            </div>
        )
    }
}