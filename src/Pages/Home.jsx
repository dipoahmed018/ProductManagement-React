import { React, useContext, useEffect, Suspense, lazy } from "react"
import { Usercontext } from "../Store/Userinfo"
import Loading from '../Components/Shared/Loading'
import Header from "../Components/Shared/Header"
import Login from "./Login"
import { Redirect } from "react-router-dom"

const Products = lazy(() => import('../Components/Products'))

export default function Home(props) {

    return (
        <div className="container">
            <Header />
            <Suspense fallback={<Loading />}>
                <Products />
            </Suspense>
        </div>
    )
}