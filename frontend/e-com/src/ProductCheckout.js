import React from 'react';
import "./ProductCheckout.css";
import StarRateIcon from '@material-ui/icons/StarRate';
import {useStateValue} from './StateProvider';
function ProductCheckout({id,title,price,img,range}) {
    const [{basket},dispatch]=useStateValue();
    const removeFromBasket = () => {
            dispatch({
                type:'REMOVE_FROM_BASKET',
                idd:id
            }) 
           
    };
    return (
        <div className="productCheckout__comp">
        <img src={img} alt=""/>
        <div className="productCheckout__info">
          <p>{title}</p>
          <p><small>$</small><strong>{price}</strong></p>
          <div className="productCheckout__range">
           {
               Array(range).fill().map(()=>(<StarRateIcon className="productCheckout__star"></StarRateIcon>))
           }
       
        </div> 
        <button onClick={removeFromBasket} className="remove__button">remove from basket</button>
        </div>
        </div> 
    )
}

export default ProductCheckout;
