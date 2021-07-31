import React, { useContext } from "react";
import { Usercontext } from "../../Store/Userinfo";
import { Link, useHistory } from "react-router-dom";
import { Productscontext } from "../../Store/ProductsData";
import Cookies from "js-cookie";

export default function ProductCard({ product: { id, title, description, price, image, owner } }) {
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
                    setProducts((prev) => ({
                        ...prev,
                        data: prev.data.length > 0 ? prev.data?.filter(prdct => prdct?.id !== id) : []
                    }));
                }
                history.push("/");
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={"product-wrapper"}>
            <img className="product-image" loading="lazy" src={image} alt="no image found" />
            <Link to={show}>
                <h3 className="title">Title: {title}</h3>
            </Link>
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
