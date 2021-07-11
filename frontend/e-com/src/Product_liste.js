import React ,{useEffect,useState}from 'react';
import './Product_liste.css';
import Animat from './Animat'
import Vertical_nav from './Vertical_nav'
import Product from './Product'
import axios from 'axios'
import BootstrapCarousel from './BootstrapCarousel'
import {Link} from  'react-router-dom'
import {useTransition,animated} from 'react-spring'
function Product_liste() {
    const [liste_products,setListe_products]=useState([])
    const [i,setI]=useState(0)
    const [homevisible,setHomevisible]=useState([])
    useEffect(()=>{
             axios.get('http://127.0.0.1:8000/products/').then(res => {
             console.log(" axios get req:", res)
             var i=0;
             var liste1=[];
             var liste2=[];
             while(i<res.data.length){
                 liste1=[...liste1,res.data[i]]
                 if((i+1)%3 === 0 && i>0){
                     liste2=[...liste2,liste1]
                     liste1=[]
                 }
                 i++
             }
             liste2=[...liste2,liste1]
             setListe_products(liste2)
             })
           
               console.log('here i am') 
              setHomevisible([{x:-100,delay:200},{x:0,delay:300},{x:100,delay:500}]) 
             
    }, [])
    
     
    const transition= useTransition(homevisible,{
        from:{x:-50,y:50,opacity:0},
        enter:item=>async(next)=>{
            await next({y:0,opacity:0.8,delay:item.delay});
            await next({x:0,opacity:1,delay:item.delay});
        },
        leave:{x:-100,opacity:0,delay:400},
        
    })
    return ( 
        <div className="home_container" >
       
         { } 
       <div className="home__product__container">  
         
        { 
        liste_products.map((liste)=>(
             
            <div  className="product_row" >
              {console.log("liste of product index:",liste_products.indexOf(liste))}
            { 
              
              liste_products.indexOf(liste)===0?
              transition((style,element) =>element?<animated.div style={style} className="product_row_animated" >
              {console.log("element:",homevisible.indexOf(element) ) }
              {  }
              {liste[homevisible.indexOf(element)]?
            <Product

                        id="1"
                        title={liste[homevisible.indexOf(element)].product_name}
                        price={liste[homevisible.indexOf(element)].prix}
                        img={liste[homevisible.indexOf(element)].product_images}
                        range={5}
                    
            />
                :''
                }
            </animated.div>:'')
             :
             liste.map((element)=>(
                <Product

                id="1"
                title={element.product_name}
                price={element.prix}
                img={element.product_images}
                range={5}
            
    />  
             ))
            
            
         } </div>))  }     
            
            </div>
            </div>
    );
}

export default Product_liste;
