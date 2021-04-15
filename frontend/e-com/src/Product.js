import React from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import './Product.css';
import { useStateValue } from './StateProvider';
function Product({id,title,price,img,range}) {
    const [{basket},dispatch]= useStateValue();
    
  const addToBasket=()=>{
      dispatch({
          type:'ADD_TO_BASKET',
          item:{
              id:id,
              title:title,
              price:price,
              img:img,
              range:range,
          }
      })
  };
    return (
        
        <div className="product__comp">
          <p><strong>{title}</strong></p>
          <p><small>$</small><strong>{price}</strong></p>
          <div className="product__range">
           {
               Array(range).fill().map(()=>(<StarRateIcon className="product__star"></StarRateIcon>))
           }
          </div>
          <img src={img} alt=""/>
          <button onClick={addToBasket}>add to basket</button>
        </div>
        
    );
}

export default Product;
