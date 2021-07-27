import { useEffect } from "react"

export default function ProductCard({product : {id, title, description, price, image}}) {
    description = description.length > 20 ? description.substr(0, description.lastIndexOf(' ', 10)) : description;
    title = title.length > 20 ? title.substr(0, title.lastIndexOf(' ', 20)) : title;

    return (
        <div id={id + 'product-wrapper'} className="product">
            {title}
            <div className="product-image">
                <img src={image} alt="no image found"/>
            </div>
            <h3 className="product-title">{title}</h3>
            <div className="intercet">
                <p className='product-price'>Price: {price}</p>
                <button>Purchase</button>
            </div>
            <p>{description}</p>
        </div>
    )
}