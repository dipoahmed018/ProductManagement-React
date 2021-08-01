import React, { useContext, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import Header from '../../Components/Shared/Header'
import { Usercontext } from '../../Store/Userinfo'
import Edit from './Edit'
import Show from './Show'

export default function Product(props) {
    const { user } = useContext(Usercontext)
    const history = useHistory()
    useEffect(() => {
        if (!user) {
            history.push('/login')
        }
    }, [user])
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/product/create" component={Edit} />
                <Route path="/product/show/:id" component={Show} />
                <Route path="/product/edit/:id" component={Edit} />
            </Switch>
        </div>
    )
}

