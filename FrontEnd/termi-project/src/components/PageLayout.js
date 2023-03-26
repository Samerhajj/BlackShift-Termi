import MainNavbar from './MainNavbar';
import {Outlet} from 'react-router-dom';
import style from './style.css';
import logoImg from '../images/TermiLogo.png';
import React, { useContext} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import christmas from "../images/about-christmas.png";
import village from "../images/celebarte-church.png";
import Image from 'react-bootstrap/Image';
import Snowfall from 'react-snowfall'
import Footer from './Footer';
import StickFooter from './StickFooter';
const PageLayout = ()=>{
var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}
var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}


    
    return(
        
        <div id="full_wrapper">
            <MainNavbar/>
            <div className="main">
                <Outlet/>
                
                <div className="push"/>
            </div>
            <footer>
                <div className="wrapper cf">
                    <div className="wrapper">
                        {/*<Image className="img-fluid " src={christmas}/>
                        <Image className="img-fluid " src={village}/>*/}
                        
                    </div>
               
                </div>
            </footer>
            
            
<div>
            <div style={phantom} />
            <div style={style}>

            <StickFooter/>
       
            </div>
</div>

       </div>
        
    );
};

// PageLayout.propTypes = {
//     children: PropTypes.node.isRequired,
// }

export default PageLayout; 
/*
<footer>
                <div className="wrapper cf">
                    <div className="wrapper">
                        {/*<Image className="img-fluid " src={christmas}/>
                        <Image className="img-fluid " src={village}/>
                         
                    </div>
               
                </div>
            </footer>*/