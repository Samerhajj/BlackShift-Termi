import React, { useContext ,Fragment} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector'; // component
import 'font-awesome/css/font-awesome.min.css';
import logoImg from '../assets/images/terminewlogo.png';
import GoToTop from './backTopPage';
import PropTypes from "prop-types";
import HamburgerLogic from './hamburgerLogic'; // component
import HandleScroll from './handleScroll'; // component
import axios from "axios";
import {logoutRoute} from '../api/ApiRoutes';
//import {useDispatch} from 'react-redux';
//import { clearUserProfile } from '../redux/actions/userDataActions';
//import {persistor} from "../redux/store";
// --> import Icons
import { IconContext } from "react-icons";
import {IoGameController, IoPersonCircle, IoInformationCircleSharp, IoSearch, IoLogOut, IoLogIn, IoAddCircle} from 'react-icons/io5';
import {MdAdminPanelSettings} from 'react-icons/md';

// --> import LoginContext
import { LoginContext } from './LoginContext';

const MainNavbar = ({setTitle,location}) => {
  
  // --> hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
// const dispatch=useDispatch();
  
  const { login, setLogin ,userData} = useContext(LoginContext);
  // --> functions
  const handleLogout = () => {
  axios.delete(logoutRoute, {
        headers: {
          'x-auth-token': `${localStorage.getItem('token')}`,
          'x-refresh-token' : `${localStorage.getItem('refreshToken')}`
        }
      })
        .then(res => {
          if (res.status === 200) {
            // Token was successfully deleted from the server
          //  dispatch(clearUserProfile());
           //  persistor.purge();
            console.log("deleted successfully")
          } else {
            // There was an error deleting the token
            console.error("error");
          }
        })
        .catch(error => {
          console.error(error);
        });
                       
    // --> remove the login and the token from the localStorage and set the value of the context to false
      
    localStorage.setItem('login', false);
    // localStorage.removeItem('profileBody');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setLogin(false);
  };
  const headerRef=HandleScroll(50,'sticky');
  const {hamburgerRef,mobileMenuRef}=HamburgerLogic();
  
  return (
    <header ref={headerRef}>
      <div className="wrapper cf" dir="ltr">
        <Link to={'/'} className="logo">
          <div>
            <img src={logoImg} alt="logo"/>
            </div>
        </Link>
        <a href="#" className="hamburger" ref={hamburgerRef}><span/></a>
        <div className="mobile_menu" ref={mobileMenuRef}>
          <Link to={'/'} className="mo_logo">
              <img src={logoImg} alt="logo"/>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to={'/'} className={location && location.pathname==='terms' ? 'active' : 'nav-link'}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoSearch/>
                  </IconContext.Provider>
                </Link>
              </li>
            {login ?(
             <Fragment>
              <li id="id_link_games">
                <Link to={'/games'} className={location && location.pathname==='games' ? 'active' : 'nav-link'}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoGameController/>
                  </IconContext.Provider>
                 </Link>
              </li>
              <li>
                <Link to={'/suggest'} className={location && location.pathname==='suggest' ? 'active' : 'nav-link'}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoAddCircle/>
                  </IconContext.Provider>
                 </Link>
              </li>
              {userData.role &&( userData.role === "admin" &&(
                  <li>
                    <Link to={'/admin'} className={location && location.pathname==='admin' ? 'active' : 'nav-link'}>
                        <IconContext.Provider value={{ size: "2rem" }}>
                          <MdAdminPanelSettings/>
                        </IconContext.Provider>
                    </Link>
                  </li>
               ))}
              
              <li>
                <Link to={'/profile'} className={location && location.pathname ==='profile' ?  'active': 'nav-link'}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoPersonCircle/>
                  </IconContext.Provider>
                </Link>
              </li>
              </Fragment>
              )
              :(  
                <li>
                  <Link to={'/register'} className={location && location.pathname==='register' ? 'active' : 'nav-link'}>
                    {t('navbar.register')}
                  </Link>
                </li>
              )}
              {!login ? (
                <li>
                  <Link to={'/login'} className={location && location.pathname==='login' ? 'active' : 'nav-link'}>
                    {t('navbar.login')}
                  </Link>
                </li>
              ):(
               <li>
                  <a id="id_logout_mainnabbar"  className="nav-link" href="login" onClick={(event) => {handleLogout();}}>
                    <IconContext.Provider value={{ size: "2rem" }}>
                      <IoLogOut/>
                    </IconContext.Provider>
                  </a>
                </li>
              )}
              <li>
                <LanguageSelector/>
              </li>
            </ul>
          </nav>  
        </div>
      </div>
      <GoToTop/>
    </header>
  );
  {
//   <header>
//       <LanguageSelector/>
//     <div className="wrapper cf">
//       <Link to={'/'} className="logo">
//           <img src={logoImg} alt="logo"/>
//         </Link>
        
//         <a href="#" className="hamburger"><span/></a>
//         <div className="mobile_menu">
//           <a href="#" className="mo_logo"><img src={logoImg} alt=""/></a>
//           <nav>
//             <ul>
//                 <li> <Link to ={'/profile'}
//                     className={location && location.pathname ==='profile' ?  'active': ''}>
//                     <i className="fa fa-user fa-lg"></i></Link>
//               </li>
//                   <li><Link to={'/terms'}
//                     className={location && location.pathname==='terms' ? 'active' : ''}>
//                     {t('navbar.terms')}</Link>
//                     </li>
//                     <li><Link to={'/games'}
//                     className={location && location.pathname==='games' ? 'active' : ''}>
//                     {t('navbar.games')}</Link>
//                     </li>
//                     <li><Link to={'/login'}
//                     className={location && location.pathname==='login' ? 'active' : ''}>
//                   {t('navbar.login')}</Link>
//                     </li>
//                     <li><Link to={'/register'}
//                     className={location && location.pathname==='register' ? 'active' : ''}>
//                     {t('navbar.register')}</Link>
//                     </li>
//               </ul>
//               </nav>
            
//           </div>
         
//         </div>
         
//     </header>
}
MainNavbar.propTypes={
  setTitle:PropTypes.string,
}
MainNavbar.defaultProps={
  setTitle:``,
}
{
    ///// Style 1
    // <Navbar bg="light" expand="lg" className="mb-3">
    //       <Container fluid>
    //         <Navbar.Brand>
    //           <Link to="/" className="navbar-brand">Termi</Link>
    //         </Navbar.Brand>
            
    //         <Navbar.Toggle aria-controls="offcanvasNavbar-expand"/>
    //         <Navbar.Offcanvas
    //           id="offcanvasNavbar-expand"
    //           aria-labelledby="offcanvasNavbarLabel-expand"
    //         >
    //           <Offcanvas.Header closeButton>
    //             <Offcanvas.Title id="offcanvasNavbarLabel-expand">
    //               Menu
    //             </Offcanvas.Title>
    //           </Offcanvas.Header>
    //           <Offcanvas.Body>
    //             <Nav className="justify-content-center flex-grow-1 pe-3">
    //               <Link to="/" className="nav-link">{t('navbar.home')}</Link>
    //               <Link to="/search" className="nav-link">{t('navbar.terms')}</Link>
    //               <Link to="/games" className="nav-link">{t('navbar.games')}</Link>
    //             </Nav>
    //             <LanguageSelector/>
    //           </Offcanvas.Body>
    //         </Navbar.Offcanvas>
    //       </Container>
    //     </Navbar>
        
    
    
    // <Navbar className="p-3" bg="light" expand="lg">
    //   <Container fluid>
    //     <Link to="/" className="navbar-brand">Termi</Link>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: '100px' }}
    //         navbarScroll>
    //         <Link to="/search" className="nav-link">{t('navbar.search')}</Link>
    //         <Link to="/games" className="nav-link">{t('navbar.games')}</Link>
    //       </Nav>
    //       <LanguageSelector/>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
}
};
export default MainNavbar;
{/*<Navbar className="navbar navbar-gray bg-gray" bg="light" expand="lg">
      <Container fluid>
        <Link to="/" className="navbar-brand">Termi</Link>
        <Navbar.Toggle/>
        <Navbar.Collapse  id="navbarCollapse">
          <Nav className="justify-content-center flex-grow-1 pe-3" >
            <Link to ="/profile" className="nav-link"> <i className="fa fa-user fa-lg"></i></Link>
            <Link to="/" className="nav-link">{t('navbar.home')}</Link>
            <Link to="/terms" className="nav-link">{t('navbar.terms')}</Link>
            <Link to="/games" className="nav-link">{t('navbar.games')}</Link>
            <Link to ="/login" className="nav-link">{t('navbar.login')}</Link>
            <Link to ="/register" className="nav-link">{t('navbar.register')}</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div>
        <LanguageSelector/>
      </div>
      
    </Navbar>*/}
    
    
    {/* TO ADD About Page you can add this code
    <li>
                <Link to={'/about'} className={location && location.pathname ==='about' ?  'active': 'nav-link'}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <IoInformationCircleSharp/>
                  </IconContext.Provider>
                </Link>
              </li>
              */}