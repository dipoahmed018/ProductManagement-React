import React, { useContext } from "react"
import { Usercontext } from "../../Store/Userinfo";
import {Link} from 'react-router-dom';

export default function ProductCard({ product: { id, title, description, price, image, owner } }) {
    const { user } = useContext(Usercontext)
    description = description.length > 200 ? description.substr(0, description.lastIndexOf(' ', 200)) : description;
    title = title.length > 100 ? title.substr(0, title.lastIndexOf(' ', 100)) : title;

    const deleteProduct = () => {
        console.log('delete')
    }
    let show = '/product/show/'+ id 
    let edit = '/product/edit/'+ id 
    return (
        <div className={'product-wrapper'}>
            <img className="product-image" loading="lazy" src={image} alt="no image found" />
            <Link to={show}>
                <h3 className="title">Title: {title}</h3>
            </Link>
            <p className="product-description">Description: {description}</p>
            <div className="product-details">
                <p className='product-price'>Price: {price}</p>
                <div className="product-control">
                    {user?.email_verified_at && <button className="butn button-purchase"> purchase </button>}
                    {user?.id == owner &&
                        <div className="owner-privilege">
                            <button className="butn button-edit"><Link to={edit}>Edit</Link></button>
                            <button onClick={deleteProduct} className="butn button-delete">delete</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}