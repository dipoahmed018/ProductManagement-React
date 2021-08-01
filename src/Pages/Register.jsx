import React, { useContext, useRef, useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import Header from '../Components/Shared/Header'
import { Usercontext } from '../Store/Userinfo'
export default function Register() {
    const { user, setUser } = useContext(Usercontext)
    const history = useHistory()
    const [error, setError] = useState('')
    const [input, setInput] = useState({ name: '', email: '', password: '' })
    const [inputError, setInputError] = useState({ name: undefined, email: undefined, password: undefined })
    const input_password = useRef()
    const error_box = useRef()
    const updateInputs = (e) => {
        const { target: { name }, target: { value } } = e
        setInput((prev) => ({ ...prev, [name]: value }))
    }
    const submit = (e) => {
        e.preventDefault()
        if (input.email.length < 1) {
            setError('please provide you email address')
            return;
        }
        if (input.password.length < 8) {
            setError('password must be bigger than 8')
            return;
        }
        fetch('http://127.0.0.1:8000/api/user/register', {
            method: 'post',
            body: JSON.stringify(input),
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        }).then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                setUser(data.user)
                history.push('/')
            })
            .catch(err => {
                if (err.status) {
                    err.json().then(data => {
                        setError(data.message ?? 'something went wrong please try again')
                        for (const err in data.errors) {
                            if (typeof data.errors[err] == 'string') {
                                setInputError(prev => ({...prev, [err] : data.errors[err][0]}))
                            } else {
                                setInputError(prev => ({...prev, [err] : data.errors[err][0]}))
                            }
                        }
                    })
                }
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
        if (error.length < 1) {
            error_box.current.classList.add('hide')
        } else {
            error_box.current.classList.remove('hide')
        }
    }, [error])
    if (typeof user == 'object') {
        return <Redirect to="/" />
    } else {
        return (
            <div>
                <Header />
                <form onSubmit={submit} action="/register" method="post" className="register">
                    <label htmlFor="name">name</label><br />
                    <input onChange={(e) => updateInputs(e)} type="text" name="name" id="name" /><br />

                    <div ref={error_box} className={inputError.name ? '' : 'hide'}>{inputError.email}<i className="bi bi-x-circle" onClick={() => setInputError(prev => ({ ...prev, name: undefined }))}></i></div>


                    <label htmlFor="email">email</label><br />
                    <input onChange={(e) => updateInputs(e)} type="email" name="email" id="email" /><br />

                    <div ref={error_box} className={inputError.email ? '' : 'hide'}>{inputError.email}<i className="bi bi-x-circle" onClick={() => setInputError(prev => ({ ...prev, email: undefined }))}></i></div>


                    <label htmlFor="password">password</label><br />
                    <div className="password-block">
                        <input ref={input_password} required onChange={updateInputs} type="password" name="password" id="password" />
                        <i onClick={changeVIsibility} className="bi bi-eye"></i>
                    </div>
                    <div ref={error_box} className={inputError.password ? '' : 'hide'}>{inputError.password}<i className="bi bi-x-circle" onClick={() => setInputError(prev => ({ ...prev, password: undefined }))}></i></div>

                    <div ref={error_box} className="error-notice">{error}<i className="bi bi-x-circle" onClick={() => setError('')}></i></div>

                    <div className="buttons">
                        <input type="submit" value="sign up" />
                        <Link to="/login"> <button className="form-link-button">log in <i className="bi bi-box-arrow-up-right"></i></button></Link>
                    </div>
                </form>
            </div>
        )
    }
}