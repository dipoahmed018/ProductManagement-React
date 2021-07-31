import Cookies from 'js-cookie';
import React, { useState, createContext, useEffect} from 'react'

export const Usercontext = createContext('loading');

export function UserInfo(props) {
    const [user, setUser] = useState('loading')

    function getUser(token) {
        fetch('http://127.0.0.1:8000/api/user', {
            method : 'get',
            mode : 'cors',
            headers : {
                'Accept' : 'application/json',
                'Authorization' : "Bearer " + token,
            }
        }).then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => setUser(data))
            .catch(err => {
                Cookies.remove('token')
                setUser(undefined)
            })
    }
    useEffect(() => {
        if(user == 'loading'){
            const token = Cookies.get('token')
            token ? getUser(token) : setUser(undefined)
        }
        if (typeof user == 'object') {
            if (user.token) {
                Cookies.set('token', user.token, {
                    sameSite : 'strict',
                    expires: 30,
                });
            }
        }
    }, [user])
    return(
    <Usercontext.Provider value={{ user, setUser}}>
        {props.children}
    </Usercontext.Provider>
    )
}