import MainNavbar from './MainNavbar';
import {Outlet} from 'react-router-dom';
import style from './style.css';
import logoImg from '../images/TermiLogo.png';
import React from "react"
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import christmas from "../images/about-christmas.png";
import village from "../images/celebarte-church.png";
import Image from 'react-bootstrap/Image';
import Snowfall from 'react-snowfall'
import Footer from './Footer';

const PageLayout = ()=>{
    
    
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