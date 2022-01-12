import React,{useRef, useState} from "react";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import {Link, useLocation} from 'react-router-dom'
import { useParams } from 'react-router';
import useScroll from './useScroll'
import useOutsideClick from './useOutsideClick'
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
  },
  {
    display: "My Listing",
    path: "/mylist"
  }
];

function Header(props) {
    const {keyword} = useParams()
    
    const {pathname} = useLocation()
    const activeNav = mainMenu.findIndex(e => e.path === pathname)

    const [menuOpen, setMenuOpen] = useState(false);

    const menuLeft = useRef(null)
    
    const isScrolled = useScroll(70);

    useOutsideClick(menuLeft, ()=>{
      if(menuOpen)
      setMenuOpen(false)
    })
  return (
    <div className={`header ${isScrolled ? 'header-fixed':''}`} ref={menuLeft}>
        <span className="icon-pushmenu navbar-toggle" onClick={()=> setMenuOpen(!menuOpen)}>
          <span className="navbar-toggler-bar"></span>
          <span className="navbar-toggler-bar"></span>
          <span className="navbar-toggler-bar"></span>
        </span>
        <a href="/" className="logo">
          <img src={logo} alt="" />
        </a>
        <ul className={`navbar-nav ${menuOpen ? 'active':''}` } ref={menuLeft}>
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
