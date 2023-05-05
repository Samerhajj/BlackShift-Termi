import React, { useContext} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import MainNavbar from './MainNavbar';
import style from './style.css';
import logoImg from '../assets/images/TermiLogo.png';
import PropTypes from "prop-types";
import Image from 'react-bootstrap/Image';
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
    };
    
    return(
        <div id="full_wrapper">
            <MainNavbar/>
            
            <div className="main">
                <Outlet/>
                <div className="push"/>
            </div>
            
            <StickFooter/>
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