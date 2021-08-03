import React,{useState} from 'react'
import axios from 'axios'
function Usetest() {
    const [count,setCount]=useState({'name':'','age':0})
    const [varr,setVarr]=useState(0)
    const click=(e)=>{
         const mm=(x)=>{
            return new Promise((resolve, reject) => {
                if(x>20){ resolve((20/x));} else if(x==0){
                    reject({status:400,message:'you cant divide by 0'})
                
                   }else{
                    reject({status:500,message:'divider less dan 20'})
                    }
                   
               
              }); 
             }
        const err =async()=>{

            const prom = await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/users/create/`,
                data: { 'username': 'aaaa', 'password': 'rrrrrr' }
            }).then(res=>{
            setCount(prev=>({...prev,age:prev.age+1}))
            console.log('errrrrrrror:::',res.status)
        
            //setCount(prev=>({...prev,age:prev.age+2}))
            }).catch(error=>{
                if(error.status===400){
                    for(var i=0;i<2;i++){
                        if(i==0){setCount(prev=>({...prev,age:prev.age+3}))}
                        else{setCount(prev=>({...prev,name:'souad'}))}
                        }
                
                console.log('errrrrrrror:::',error.message)
                 }
                 else{setCount(prev=>({...prev,age:prev.age+6}))
                 console.log('errrrrrrror:::',error.message)}
            })
                
            
        }
        err()
       
        /*err().catch(error=>{setCount(prev=>({...prev,age:prev.age+1}))})*/
      
    }
    return (
        <div>
            <input onChange={e=>setVarr(e.target.value)}></input>
           <h1 style={{color:(count.age>10?'green':'red')}}>{count.name} age= {count.age}</h1> 
           <button onClick={click}>click</button>
        </div>
    )
}

export default Usetest