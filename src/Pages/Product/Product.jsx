import React, { useContext, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { Usercontext } from '../../Store/Userinfo'
import Edit from './Edit'
import Show from './Show'

export default function Product(props) {
    const {user} = useContext(Usercontext)
    const history = useHistory()
    useEffect(() => {
        if (!user) {
            history.push('/login')
        }
    }, [user])
    return (
        <Switch>
            <Route  path="/product/create" component={Edit}/>
            <Route  path="/product/show/:id" component={Show} />
            <Route  path="/product/edit/:id" component={Edit} />
        </Switch>
    )
}

