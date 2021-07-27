import React, { useContext, useEffect, useState } from "react";
import { Productscontext } from "../Store/ProductsData";
import { Usercontext } from "../Store/Userinfo";
import ProductCard from "./Shared/ProductCard";

export default function Products() {
    const {user} = useContext(Usercontext)
    const {setProductsData} = useContext(Productscontext)
    const [products, setProducts] = useState()
    useEffect(() => {
        if (typeof user == 'object') {
            fetch('https://fakestoreapi.com/products', {
                method : 'get',
            }).then((res) => res.json())
                .then(products => {setProducts(products); setProductsData(products)})
                .catch(err => setProducts(undefined))
        }
    }, [user])
    return (
        <div>
            <h1>products</h1>
            <div className="products">
                {products && products.map((product) => (<ProductCard key={product.id} product={product} />)) }
            </div>
        </div>
    )
}