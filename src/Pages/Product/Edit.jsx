import Cookies from "js-cookie"
import { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom"
import Wrong from "../../Components/Shared/Error."
import Header from "../../Components/Shared/Header"
import Loading from "../../Components/Shared/Loading"
import { Productscontext } from "../../Store/ProductsData"
import { Usercontext } from "../../Store/Userinfo"

export default function Edit() {
    const { user, setUser } = useContext(Usercontext)
    const { products } = useContext(Productscontext)
    const { path } = useRouteMatch()
    const history = useHistory()
    const { id } = useParams()
    const [error, setError] = useState()
    const [input_error, setInput_error] = useState({title : undefined, description: undefined, image: undefined, price: undefined});
    const [product, setProduct] = useState('loading')
    const preview_box = useRef()
    const image_input = useRef()

    const resetImage = () => {
        preview_box.current.lastElementChild.src = ""
        image_input.current.value = ''
        setProduct((prev) => ({...prev, image : undefined}))
    }
    const updateInputs = (e) => {
        const { target: { name }, target: { value } } = e
        if (name == 'image') {
            setProduct(prev => ({ ...prev, image: e.target.files[0] }))
            const image_element = preview_box.current.lastElementChild
            const url = URL.createObjectURL(e.target.files[0])
            image_element.src = url
            preview_box.current.classList.remove('hide')
        } else {
            setProduct((prev) => ({ ...prev, [name]: value }))
        }
        console.log(product)
    }

    const createProduct = (e) => {
        e.preventDefault()
        const form = new FormData
        for (const key in product) {
            form.append(key, product[key])
        }
        fetch(`http://127.0.0.1:8000/api/product/create`, {
            method: 'post',
            body: form,
            mode: 'cors',
            headers : {
                'Accept': 'Application/json',
                "Authorization" : `Bearer ${Cookies.get('token')}`
            }
        }).then((res) => res.ok? res.json() : Promise.reject(res))
        .then(data => {
            data.id ? history.push(`/product/show/${data.id}`) : console.log(data);
        })
        .catch(err => 
            err.json().then((data => {
            if (data.status == 401) {
                setUser(undefined)
            }
            if (data.status == 422) {
                
            }
        }))
        )
    }
    const updateProduct = (e) => {
        e.preventDefault()
        // fetch(`http://127.0.0.1:8000/api/product/update`, {
        //     method: 'put',

        // })
        console.log('update')

    }
    const getProduct = async (id) => {
        try {
            let data = products.data.find(prdct => prdct.id == id)
            if (!data) {
                const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                    method: 'get',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                res.ok ? res.json().then(prdct => {
                    if (prdct.owner !== user.id) {
                        setProduct(undefined)
                        setError('You do not have permission to edit this product')
                    } else {
                        setProduct(prdct)
                    }
                }) : Promise.reject(res)
            } else if (data?.owner !== user?.id) {
                setProduct(undefined)
                setError('You do not have permission to edit this product')
            } else {
                setProduct(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

    }, [input_error])

    useEffect(() => {
        if (id && user?.id) {
            getProduct(id)
        }
        if (!user) {
            history.push('/login')
        }
        if (path == '/product/create') {
            setProduct(undefined)
        }
    }, [user])

    return (
        <div className="product-container">
            <Header />
            {error &&
                <Wrong message={error}></Wrong>
            }
            {product == 'loading' &&
                <Loading />
            }
            {(typeof product == 'object' || path == '/product/create') &&
                <form className="product-form" onSubmit={(e) => id ? updateProduct(e) : createProduct(e)}>
                    <div className="image-box">
                        <div className="image-preview hide"><img src="" alt="" /></div><br />
                    </div>

                    <label htmlFor="title">Title: </label><br />
                    <input required onChange={updateInputs} type="text" name="title" id="title" value={product?.title ?? ''} minLength="5" maxLength="250" /><br />
                    <div className={`error ${input_error.title ? '' : 'hide'}`}>{input_error.title ?? ''}</div>
                    <label htmlFor="description">Description: </label><br />
                    <textarea required onChange={updateInputs} name="description" id="description" cols="30" rows="10" minLength="10" maxLength="500" value={product?.description ?? ''}></textarea><br />
                    <div className={`error ${input_error.description ? '' : 'hide'}`}>{input_error.description ?? ''}</div>
                    <label htmlFor="price">Price: </label><br />
                    <input required onChange={updateInputs} type="number" name="price" id="price" min={1} max={10000} value={product?.price ?? ''} />
                    <div className={`error ${input_error.price ? '' : 'hide'}`}>{input_error.price ?? ''}</div>

                    <div ref={preview_box} className={`image-preview-box ${product?.image ? '' : 'hide'}`}>
                        <i onClick={resetImage} className="bi bi-x-lg pointer"></i>
                        <img src={typeof product?.image == 'string' ? product.image : ""} alt="" />
                    </div>
                    <div className="image-upload-box">
                        <label htmlFor="image">{`${product?.image ? 'change' : 'upload'} image`}</label>
                        <input ref={image_input} required onChange={updateInputs} type="file" name="image" id="image" accept=".jpg, .jpeg, .png" />
                    </div>
                    <div className={`error ${input_error.image ? '' : 'hide'}`}>{input_error.image ?? ''}</div>

                    <input type="submit" value={`${id ? 'Edit' : 'Create'} Product`} />

                </form>
            }
        </div>
    )
}