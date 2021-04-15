import React from 'react';
import './Header.css';
import {useHistory,Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from './StateProvider';
import { myauth } from './firebase';
function Header() {
    const history =useHistory();
    const [{basket,user}] = useStateValue();
   const login= ()=>{
      if(user){
          myauth.signOut();
          history.push("/");
      }
    }
    return (
        <nav className="header">
           
           <Link to="/"><img src='../e-com-logo.png' className="header__logo" alt=""/></Link>
           <div className="header__search">
            <input type="search" className="header__searchInput"></input>
             <SearchIcon className="header__searchIcon"/></div>
            
            {/* links in the header */}
            <div className="header__nav">
              <Link to={!user && "/login"} className="header__link">
                  <div onClick={login} className="header__navLink">
    <span className="header__linkLineOne">login {user?.email}</span>
    <span className="header__linkLineTow">{user? 'Sign Out' : 'Sign In'}</span>
                  </div>
              </Link>                
              <Link to="/login" className="header__link">
                  <div className="header__navLink">
                      <span className="header__linkLineOne">get </span>
                      <span className="header__linkLineTow">Connect</span>
                  </div>
              </Link>
              <Link to="/login" className="header__link">
                  <div className="header__navLink">
                      <span className="header__linkLineOne">more</span>
                      <span className="header__linkLineTow">Promo</span>
                  </div>
              </Link>                
           </div>
            <div className="header__basket">
                <Link to="/checkout" >
                <img src="../basket.png" alt="" className="header__basketIcon" />
    <span className="header__basketCounter">{basket?.length}</span>
    </Link>
            </div> 
            
        </nav>
           
        
    )
}

export default Header;
