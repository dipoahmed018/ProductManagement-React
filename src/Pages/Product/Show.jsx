import Cookies from "js-cookie"
import { Fragment, useContext, useEffect, useState } from "react"
import { useParams, Link, useHistory, useLocation } from "react-router-dom"
import Wrong from '../../Components/Shared/Error.'
import { Productscontext } from "../../Store/ProductsData"
import { Usercontext } from "../../Store/Userinfo"

export default function Show() {
    const { user } = useContext(Usercontext)
    const { products, setProducts } = useContext(Productscontext)
    const history = useHistory()
    const { id } = useParams()
    const location = useLocation()
    const [error, setError] = useState()
    const [product, setProduct] = useState()

    const deleteProduct = () => {
        fetch(`http://127.0.0.1:8000/api/product/delete/${id}`, {
            method: "delete",
            headers: {
                "Accept": "application/json",
                "Authorization" : 'Bearer ' + Cookies.get('token')
            },
        })
            .then((res) => {
                if (res.ok) {
                    setProducts((prev) => ({
                        ...prev,
                        data: prev.data.length > 0 ? prev.data.filter(prdct => prdct?.id !== id) : []
                    }));
                }
                history.push("/");
            })
            .catch((err) => console.log(err));
    };
    const getProduct = () => {

        const data = products.data?.find(value => value.id == id)
        if (data) {
            setProduct(data)
            return;
        } else if (location.state.product) {
            setProduct(location.state.product)
            return;
        } else {
            fetch('http://127.0.0.1:8000/api/products/' + id, {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(res => res.ok ? res.json() : Promise.reject(res))
                .then(data => setProduct(data))
                .catch(err => {
                    setProduct(undefined)
                    err.status == 404 ? setError('product not found') : setError('something went wrong in sever please try again')

                })
        }
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <Fragment>
            {error && <Wrong message={error}></Wrong>}
            {product &&
                <div>

                    <div className="image-viewer">
                        <img width="100%" src={product.image} alt="no image found" />
                    </div>

                    <div className="title"><h2>{product.title}</h2><div className="menu">:</div></div>

                    <div className="description">
                        {product.description}
                    </div>
                    <div className="interect">
                        <button className="product-purchase">paurchase</button>
                        {product.owner == user?.id &&
                            <Fragment>
                                <button className="product-edit"><Link to={`/product/edit/${id}`} >Edit</Link></button>
                                <button className="product-delete" onClick={deleteProduct}>Delete</button>
                            </Fragment>
                        }
                    </div>
                </div>
            }
        </Fragment>
    )
}