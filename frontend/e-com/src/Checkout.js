import React from 'react';
import { useStateValue } from './StateProvider';
import ProductCheckout from './ProductCheckout';
import './Checkout.css';
import CheckoutTotal from './CheckoutTotal';
function Checkout() {
    const [{basket}]= useStateValue(); 
    const  x = 0;
    return (
        <div className="checkout__com">
          <div className="checkout__product"> 
          <div className="checkout__adv">
          <span >Ad</span>
          <div className="checkout__ad">
         
          
          </div>
          </div>
          {basket?.length === 0 ?
         ( <div><h3>your basket is empty go back home and choose some products</h3></div>) :
         (<div><h1>your items : </h1>
            {basket.map(item =>(
               <ProductCheckout 
               id={item.id}
               title={item.title}
               price={item.price}
               img={item.img.filter((item)=>(item.default))[0]._product_image}
               range={item.range}

               />
            )

            )}

           </div>)

          }
          </div>
         <div >
          
            <CheckoutTotal />
         </div>
        </div>
    )
}

export default Checkout;
