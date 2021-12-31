import React,{useRef} from "react";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import {Link, useLocation} from 'react-router-dom'
import { useParams } from 'react-router';

const mainMenu = [
  {
    display: "Home",
    path: "/"
  },
  {
    display: "Movies",
    path: "/movie"
  },
  {
    display: "Tv Show",
    path: "/tv"
  }
];

function Header(props) {
    const {keyword} = useParams()
    
    const {pathname} = useLocation()
    const activeNav = mainMenu.findIndex(e => e.path === pathname)

    const menuLeft = useRef(null)
    const menuToggle = () => menuLeft.current.classList.toggle('active')
  return (
    <div className="header">
        <span className="icon-pushmenu navbar-toggle" onClick={menuToggle}>
          <span className="navbar-toggler-bar"></span>
          <span className="navbar-toggler-bar"></span>
          <span className="navbar-toggler-bar"></span>
        </span>
        <a href="/" className="logo">
          <img src={logo} alt="" />
        </a>
        <ul className="navbar-nav" ref={menuLeft}>
            {
                mainMenu.map((item,index) => (
                    <li
                        className ={`level1 ${index === activeNav ? 'active':''}`}
                        key={index} >
                        <Link to={item.path}>{item.display}</Link>
                    </li> 
                ))
            }
            
        </ul>
        <div className="navbar-search">
        
        <SearchBar keyword={keyword}/>
        </div>
      </div>
    
  );
}

export default Header;
