import React ,{useEffect,useState}from 'react';
import './Home1.css';
import Animat from './Animat'
import Vertical_nav from './Vertical_nav'
import Liste_product from './Liste_product'
import axios from 'axios'
import BootstrapCarousel from './BootstrapCarousel'
import {Link} from  'react-router-dom'
import {useTransition,animated} from 'react-spring'
function Home1() {
    const [liste_products,setListe_products]=useState([])
    const [i,setI]=useState(0)
    const [homevisible,setHomevisible]=useState(false)
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
    }, [])
    
    function change(j){
           setI(j)
    }
    return ( 
        <div className="home_container" >
          
       <div className="home__product__container">  
          {
         // <Animat/> 
          }
        { 
        liste_products.map((liste)=>(
            
            <div  className="product_row" style={{backgroundcolor:  (i==0? 'red' : 'green' )}}>
              
            { 
            liste.map((item) => (
                
            <Liste_product

                        id="1"
                        title={item.product_name}
                        price={item.prix}
                        img={item.product_images}
                        range={5}
                    
            />
         ))}
                 
         </div>)) }       
            </div>
            <div></div>
            </div>
    );
}

export default Home1;
