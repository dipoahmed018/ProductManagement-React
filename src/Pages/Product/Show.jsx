import { Fragment, useContext, useEffect, useState } from "react"
import { useParams, Link, useHistory, useRouteMatch } from "react-router-dom"
import Wrong from '../../Components/Shared/Error.'
import { Productscontext } from "../../Store/ProductsData"

export default function Show() {

    const {products} = useContext(Productscontext)
    const { id } = useParams()
    const {path} = useRouteMatch()
    const [error, setError] = useState()
    const [product, setProduct] = useState()

    const deleteProduct = () => {
        
    }

    useEffect(() => {
        console.log(path)
        const data = products.data?.find((value) => value.id == id)
        if (data) {
            setProduct(data)
        } else {
            fetch('http://127.0.0.1:8000/api/products/'+ id, {
                method : 'get',
                mode: 'cors',
                headers: {
                    'Accept' : 'application/json'
                }
            }).then(res => res.ok ? res.json() : Promise.reject(res))
                .then(data => setProduct(data))
                .catch(err => {
                  setProduct(undefined)
                  err.status == 404 ? setError('product not found') : setError('something went wrong in sever please try again')

                })
        }
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
                        <button>paurchase</button>
                        <button><Link to={`/product/edit/${id}`} >Edit</Link></button>
                        <button onClick={deleteProduct}>Delete</button>
                    </div>
                </div>
            }
        </Fragment>
    )
}