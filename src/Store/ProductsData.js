import React, { useState, createContext } from 'react'

export const Productscontext = createContext('loading');

export function ProductsData(props) {
    const [products, setProducts] = useState([])
    const [nextPage, setNextPage] = useState(`http://127.0.0.1:8000/api/products`)

    return (
        <Productscontext.Provider value={{ products, setProducts, nextPage, setNextPage }}>
            {props.children}
        </Productscontext.Provider>
    )
}