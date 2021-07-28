import { useEffect } from "react"

export default function ProductCard({product : {id, title, description, price, image}}) {
    description = description.length > 200 ? description.substr(0, description.lastIndexOf(' ', 200)) : description;
    title = title.length > 100 ? title.substr(0, title.lastIndexOf(' ', 100)) : title;

    return (
        <div className={'product-wrapper'}>
            <div className="product-image">
                <img src={image} alt="no image found"/>
            </div>
            <h3 className="product-title">{title}</h3>
            <p className="product-description">{description}</p>
            <div className="product-details">
                <p className='product-price'>Price: {price}</p>
                <button>Purchase</button>
            </div>
        </div>
    )
}