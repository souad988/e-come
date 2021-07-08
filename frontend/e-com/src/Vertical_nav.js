import React ,{useState,useEffect} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import {useHistory,Link} from 'react-router-dom';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import './Vertical_nav.css'
function Vertical_nav() {
    const [visible,setVisible]= useState(false)
    return (
        <div className="vertical_nav_container">
        <div  className="vertical_nav" >
           <div className="hooover" onMouseEnter={()=>{setVisible(true )}} onMouseLeave={()=>{setVisible(false )}}><Link to='/' ><a style={{color:'rgb(111, 195, 206)' ,fontWeight:'bold'}} ><HomeIcon  ></HomeIcon></a> </Link></div> 
           <a style={{color:'rgb(248,176,176)',fontWeight:'bold'}}><PaymentIcon></PaymentIcon></a> 
           <a style={{color:'rgb(248,205,80)',fontWeight:'bold'}}><CardGiftcardIcon></CardGiftcardIcon></a> 
           {//<img src="../delivery-truck.png" alt="" style={{width:'30px',height:'30px'}}></img>
           }
           <a style={{color:'rgb(111, 195, 206)',fontWeight:'bold'}}><LocalShippingIcon></LocalShippingIcon></a> 
        </div>

        <div className="vertical_nav_home" style={{visibility:visible?'visible':'hidden'}} >home</div> 
         </div>
    )
}

export default Vertical_nav
