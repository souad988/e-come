import React from 'react'
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Divider from '@material-ui/core/Divider';
function Footer() {
    return (
        <div className="footer_container" style={{position: 'fixe', bottom: '0',padding:'1%',width:'100%',margin:'auto',display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center',backgroundColor:'black',maxHeight:'200px',marginBottom:'0%',color:'gold'}}>
            
               <div style={{margin:'auto', padding:'1%'}}>
               <a href="https://www.youtube.com/watch?v=t-icTxSPJJg&list=PLV6Je3wL9R8hib4sLE-WrOGB612Opc53y&index=7" style={{color:'rgb(111, 195, 206)'}}><YouTubeIcon style={{height:'30px',width:'30px'}}></YouTubeIcon></a>
              </div>
             <div style={{margin:'auto', padding:'1%'}} > 
           
               <a href="https://www.linkedin.com/in/souad-el-mansouri-4725491a0" style={{color:'rgb(248,176,176)'}}><LinkedInIcon style={{height:'30px',width:'30px'}}></LinkedInIcon></a>
           </div>
           <Divider ></Divider>
           <p style={{margin:'auto',fontSize:'12px'}}><small > souadelmansouri2018@gmail.com </small></p>
        </div>
    )
}

export default Footer
