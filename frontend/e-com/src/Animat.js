import React from 'react'
import {Spring,animated} from 'react-spring'

import BootstrapCarousel from './BootstrapCarousel'
import './animat.css'
function Animat() {
    return (
        <div className="animat_container">
       
        <Spring 
                
                from={{opacity: 0.5 ,width:'0%'}}
                to={[{opacity: 1,width:'100%'}]}
                config={{duration:1000}}
                
        >
           {styless=>(
              <animated.div className="animdiv" style={styless}>
                 <div className="animdiv_container">
                     <div className="animdiv_best_selers"><h1>BEST SELERS</h1></div>
                     <BootstrapCarousel  > </BootstrapCarousel>
                     <div className="animdiv_descount" ><h1 >-50%</h1></div>
                 </div>
              </animated.div>
           )}
        </Spring>
         <Spring 
                
                from={{opacity: 0.5 ,width:'0%'}}
                to={[{opacity: 1,width:'100%'}]}
                config={{duration:2000}}
                
        >
           {styles=>(
              <animated.div className="logo_container_anim" style={styles}><div className="logo_container"><img src="../e-com-logo.png" alt="" className="logo"></img></div></animated.div>
           )}
        </Spring>
        </div>
    )
}
const styly={
    margin:'auto',
    color:'white',
    width:'100px',
    height:'100px',
    background:'red'
}
export default Animat;
