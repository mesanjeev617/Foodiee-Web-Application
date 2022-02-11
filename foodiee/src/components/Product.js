import React from 'react';
import '../CSS/Product.css'
import {Link} from 'react-router-dom';
import Rating from './Rating'

function Product(props) {
    const {resturant} = props;

    return (
        <div key={resturant._id} className="product">
            <div className = "product__info">
            <Link to={`/resturant/${resturant._id}`}>
                 <h2>{resturant.name}</h2> </Link>
               
                    <p className="product__price"> 
                         
                         <strong>{resturant.address}</strong>
                    </p>

                    <div className="product__rating">
                    <Rating rating={resturant.rating} numReviews={resturant.numReviews}></Rating>
                    </div>
            
            </div>
               
                <img  src={resturant.image}  alt={resturant.name}/>
        </div>
    )
}

export default Product
