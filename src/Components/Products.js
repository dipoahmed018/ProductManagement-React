import React, { useContext, useEffect, useRef, useState } from "react";
import { Productscontext } from "../Store/ProductsData";
import { Usercontext } from "../Store/Userinfo";
import Loading from "./Shared/Loading";
import ProductCard from "./Shared/ProductCard";

export default function Products() {
  const { user } = useContext(Usercontext);
  const {products, setProducts } = useContext(Productscontext);
  const productsElem = useRef();

  const getProducts = (newxtPage = "http://127.0.0.1:8000/api/products") => {
    fetch(newxtPage, {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts((prev) => {
            return {data : [...prev.data , ...res.products.data], nextPage : res.products.next_page_url}
        });
      })
      .catch((err) => setProducts(undefined));
  }

  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    if (products.nextPage) {
      const chil = productsElem.current
      console.log(chil.lastElementChild)
    }
  }, [products])
  return (
    <div>
      <h1>products</h1>
      <div ref={productsElem} className="products">
        {!products.data && <Loading></Loading>}
        {products.data &&
          products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
