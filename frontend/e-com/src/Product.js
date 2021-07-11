import React from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import './Product.css';
import {useHistory,Link} from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Product({id,title,price,img,range}) {
    const [{basket,user,product},dispatch] = useStateValue();
    const history=useHistory()
    const product_detail= ()=>{
                  
                  dispatch({
                      type:'SET_PRODUCT',
                      product:{id,title,price,img,range}
                  }) 
                  history.push("/product_detail");
                  console.log("reducer product:::",product)
      }
    return (

        <div className='product_comp_container'>
        <div className="product__comp" onClick={product_detail}  >
          
         <div style={{display:'grid' ,gridTemplateColumns:'2fr 1fr',gap:'1em',justifyContent:'left'}}>
             <p><strong>{title}</strong></p>
             <p className="product_comp_price"><small>dh</small><strong style={{}}>{price}</strong></p>
         </div>
          
          <img src={img.filter((item)=>(item.default))[0]._product_image } alt=""/>
        </div>
        </div>
        
    );
}

export default Product;
