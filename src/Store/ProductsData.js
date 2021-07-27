import React, { useState, createContext, useEffect, useContext} from 'react'
import { Usercontext } from './Userinfo';

export const Productscontext = createContext('loading');

export function ProductsData(props) {
    const [productsData, setProductsData] = useState(undefined)
    return(
    <Productscontext.Provider value={{ productsData, setProductsData}}>
        {props.children}
    </Productscontext.Provider>
    )
}