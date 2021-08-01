import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Productscontext } from "../Store/ProductsData";
import { Usercontext } from "../Store/Userinfo";
import Error from "./Shared/Error.";
import Loading from "./Shared/Loading";
import ProductCard from "./Shared/ProductCard";

export default function Products() {
  const { products, setProducts, nextPage, setNextPage } = useContext(Productscontext);
  const productsParent = useRef()
  const getProducts = (nextpage) => {
    fetch(nextpage, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => ([...prev, ...data.products.data]));
        setNextPage(data.products.next_page_url)
      })
      .catch((err) => {
        if (products?.length < 1) {
          setProducts(undefined)
        }
      });
  }


  useLayoutEffect(() => {
    if (products?.length > 0) {
      let lastElement = productsParent.current.lastElementChild
      const observer = new IntersectionObserver((entry, observer) => {
        if (entry[0]['isIntersecting'] == true) {
          getProducts(nextPage)
          observer.unobserve(entry[0]['target'])
        }
      }, { threshold: [1] })
      if (nextPage) {
        observer.observe(lastElement)
      }
      return () => {
        observer.disconnect()
      }
    }
  }, [nextPage, products])

  useEffect(() => {
    if (products?.length < 1) {
      getProducts(nextPage)
    }
  }, [])
  return (
    <div ref={productsParent} className="products">
      {!products && <Error message={'something went wrong please try again'} />}
      {products?.length < 1 && <Loading />}
      {products?.length > 0 &&
        products?.map((prdct) => {
          return <ProductCard key={prdct.id.toString()} product={prdct} />
        })}
      {nextPage ? <Loading /> : <h1>No more Product available</h1>}
    </div>
  );
}
