import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { Usercontext } from '../Store/Userinfo'


export default function ForgotPassword (){
    const {user, setUser} = useContext(Usercontext)
    const history = useHistory()
    const [error, setError] = useState('')
    const [email, setEmail] = useState()
    const error_box = useRef()
    const submit = (e) => {
        e.preventDefault()
        console.log(window.location.hostname)
        fetch('http://127.0.0.1:8000/api/forgot-password',{
            method : 'POST',
            body : JSON.stringify({'email' : email}),
            mode : 'cors',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-type' : 'application/json',
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
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
            <div className="form ForgotPassword">
                <form onSubmit={submit} action="">
                <label htmlFor="email">Email</label><br />
                <input required onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email"/><br />
                <div ref={error_box} className="error-notice">{error}<i className="bi bi-x-circle" onClick={() => setError('')}></i></div>
                <div className="buttons">
                <input type="submit" value="Send Link"/>
                </div>
                </form>
            </div>
        )
    }
}