import React,{useEffect,useState} from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import Payment from '@material-ui/icons/Payment';
import './product_detail.css';
import { useStateValue } from './StateProvider';
import {useHistory} from 'react-router-dom'
import {useTransition,animated} from 'react-spring'
function Product_detail() {
    const [{basket,product},dispatch]= useStateValue();
    const history=useHistory()
    const [play,setPlay]=useState(false)
   useEffect(()=>{
            if(product==null){
                history.push('/')
            }
            setPlay(true)
   },[] )
  const addToBasket=()=>{
      dispatch({
          type:'ADD_TO_BASKET',
          item:{
              id:product.id,
              title:product.title,
              price:product.price,
              img:product.img,
              range:product.range,
          }
      })
  };
  const transition=useTransition(play,{
    from:{x:700,y:-1000,opacity:0.4},
    enter:()=>async(next)=>{
        await next({y:0,opacity:0.7,delay:300});
        await next({x:0,opacity:1,delay:100});
    },
    leave:{x:-100,opacity:0,delay:400},
    
})
    return (
        transition((style,item)=>item?
        <animated.div style={style} >
        <div className="product_detail_container">
        
          {product===null? history.push('/') :
           (<div className="product_detail_comp">
          <div className="product_detail_comp_img">
          <img src={product.img.filter((item)=>(item.default))[0]._product_image } alt=""/>
          </div>
              <div className="product_detail_comp_info">
                    <div className="product__range">
                    <p><strong>{product.title}</strong></p>
                    {
                        Array(product.range).fill().map(()=>(<StarRateIcon className="product__star"></StarRateIcon>))
                    }
                    
                    </div>
                    <p><strong>price :</strong><small>dh</small><strong>{product.price}</strong></p>
                    <button onClick={addToBasket}><Payment></Payment>add to basket</button>
              </div>
          
         </div>
          )}
        
        </div></animated.div>:'')
        
    );
}

export default Product_detail;
