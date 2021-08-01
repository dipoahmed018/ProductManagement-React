import React, { useContext, useEffect } from "react";
import { Usercontext } from "../../Store/Userinfo";
import { Link, useHistory } from "react-router-dom";
import { Productscontext } from "../../Store/ProductsData";
import Cookies from "js-cookie";

export default function ProductCard({ product }) {
    let { id, title, description, price, owner, image } = product
    const { user } = useContext(Usercontext);
    const { products, setProducts } = useContext(Productscontext);
    const history = useHistory()
    description = description.length > 200 ? description.substr(0, description.lastIndexOf(" ", 200)) : description;
    title = title.length > 100 ? title.substr(0, title.lastIndexOf(" ", 100)) : title;

    let show = "/product/show/" + id;
    let edit = "/product/edit/" + id;

    const deleteProduct = () => {
        fetch(`http://127.0.0.1:8000/api/product/delete/${id}`, {
            method: "delete",
            headers: {
                "Accept": "application/json",
                "Authorization": 'Bearer ' + Cookies.get('token')

            },
        })
            .then((res) => {
                if (res.ok) {
                    setProducts(prev => (prev ? prev.filter(prev_product => prev_product.id !== id) : prev))
                }
                history.push("/");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={"product-wrapper"}>
            <img className="product-image" loading="lazy" src={image} alt="no image found" />
            <h3 className="title">
                <Link to={show}>
                    Title: {title}
                </Link>
            </h3>
            <p className="product-description">Description: {description}</p>
            <div className="product-details">
                <p className="product-price">Price: {price}</p>
                <div className="product-control">
                    {user?.email_verified_at && (
                        <button className="butn button-purchase"> purchase </button>
                    )}
                    {user?.id == owner && (
                        <div className="owner-privilege">
                            <button className="butn button-edit pointer">
                                <Link to={edit}>Edit</Link>
                            </button>
                            <button className="pointer" onClick={deleteProduct} className="butn button-delete">
                                delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
