import React, { useState, createContext} from 'react'

export const Productscontext = createContext('loading');

export function ProductsData(props) {
    const [products, setProducts] = useState({data: [], nextPage: undefined})
    return(
    <Productscontext.Provider value={{ products, setProducts}}>
        {props.children}
    </Productscontext.Provider>
    )
}