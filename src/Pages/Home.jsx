import { React, useContext, useEffect, Suspense, lazy } from "react"
import { Usercontext } from "../Store/Userinfo"
import Loading from '../Components/Shared/Loading'
import Header from "../Components/Shared/Header"
import Login from "./Login"
import { Redirect } from "react-router-dom"

const Products = lazy(() => import('../Components/Products'))

export default function Home(props) {
    const {user, setUser} = useContext(Usercontext)
    useEffect(() => {
       
    })
    if (user == 'loading') {
        return <Loading></Loading>
    }
    if (typeof user == 'object') {

        return (
            <div className="container">
                <Header user={user} />
                <Suspense fallback={<Loading />}>
                    <Products />
                </Suspense>
            </div>
        )
    }
    if(user == undefined) {
        return <Redirect to="/login" />
    }
}