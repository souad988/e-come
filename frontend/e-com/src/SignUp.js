import React from 'react'

function SignUp() {
       const 
    return (
        <div>
            <div className="signup__container">
           <Link to="/">
               <img src="../e-com-logo.png" alt=""/>
           </Link>
           <div className="signup__form">
               <h1>Sign-up </h1>
               <form>
                  
                   <h5><strong>User name</strong></h5>
                   <input value={username} type="text" onChange={event=>setUsername(event.target.value)}></input>
                   <h5><strong>Email</strong></h5>
                   <input value={email} type="email" onChange={event=>setEmail(event.target.value)}></input>
                   <h5><strong>Password</strong></h5>
                   <input value={password} type="password" onChange={event=>setPassword(event.target.value)}></input>
                   <h5><strong>Confirm Password</strong></h5>
                   <input value={password1} type="password" onChange={event=>setPassword1(event.target.value)}></input>
                  
                  
                   <button type="submit" onClick={register}> Create account </button>
               </form>
           </div>
        </div> 
        </div>
    )
}

export default SignUp
