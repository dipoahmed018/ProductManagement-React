import React, { useState, createContext, useEffect} from 'react'

export const Usercontext = createContext('loading');

export function UserInfo(props) {
    const [user, setUser] = useState('loading')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method : 'get',
        }).then((res) => res.json())
            .then(user => setUser(undefined))
            .catch(err => setUser(undefined))
    }, [])
    return(
    <Usercontext.Provider value={{ user, setUser}}>
        {props.children}
    </Usercontext.Provider>
    )
}