import React, { useState} from 'react'  
import Carousel from 'react-bootstrap/Carousel' 
import './BootstrapCarousel.css' 

function BootstrapCarousel () {  
        const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

        return (
     
                          
                          
                         <Carousel style={{'maxHeight':"150px", 'width':"300px", 'margin':"auto"}} slide={true} fade={true}  activeIndex={index} onSelect={handleSelect} nextLabel={''} prevLabel={''}>  
                                        <Carousel.Item  interval={3000} className="carouselItem">  
                                                <img style={{'height':"150px"}}  
                                                className="d-block w-100"  
                                                src={'assets/img/hijab.png'}  />  
                                                <Carousel.Caption>  
                                                <h3></h3>  
                                                        </Carousel.Caption>  
                                        </Carousel.Item   >  
                                                <Carousel.Item  interval={3000}>   
                                                <img style={{'height':"150px"}}  
                                                className="d-block w-100"  
                                                src={'assets/img/hijab2.png'}    />  
                                                <Carousel.Caption>  
                                                <h3></h3>  
                                                </Carousel.Caption>  
                                                </Carousel.Item>  
                                        <Carousel.Item  interval={3000} >  
                                                <img style={{'height':"150px"}}  
                                                        className="d-block w-100"  
                                                        src={'assets/img/images.png'}   />  
                                                        
                                        </Carousel.Item>  
                                </Carousel>  
                                
                        
                )  
        }  
 
  
export default BootstrapCarousel  