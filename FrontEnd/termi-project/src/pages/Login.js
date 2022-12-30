// --> Hooks
import React,{useState,useContext,useEffect} from 'react';
import { useNavigate,Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// --> imports
import validator from 'validator'
import { LoginContext } from '../components/LoginContext';

// --> APIs
import AuthAPI from '../api/AuthAPI';


// --> style
import 'font-awesome/css/font-awesome.min.css';
import {Row,Col} from 'react-bootstrap';
import LoginSytle from "./../styles/LoginStyle.css";

const Login = () =>{
  
    // --> Hooks
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [loginData,setLoginData]=useState({email:"",password:""})
    const [error,setError] = useState({wrongPass:false,vaildEmail:false});
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    
    // --> here we get the context from LoginContext
    const { login, setLogin } = useContext(LoginContext);
   
   // --> The first time to load the page we set the login
//   useEffect(() => {
//     localStorage.setItem('login', login);
//     }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      {
      // --> some validation in the front ,in order to prevent unnecessary requests
      // if(loginData['email']=="" && loginData['password']==""){
      //   setError({...error,vaildEmail:true,wrongPass:true});
      //   return;
      // }
      // if(!validator.isEmail(loginData['email'])){
      // setError({...error,vaildEmail:true});
      // return ;
      // }else{setError({...error,vaildEmail:false});}

      // if(loginData['password'].length<6){
      //   setError({...error,wrongPass:true});
      //   return ;
      // }
      // else{setError({...error,vaildEmail:false});}
      }
      const response = await AuthAPI.login(loginData);
      
      if(response.success){
          // --> redirect to the homepage 
          setLogin(true);
          navigate("/");
      }else{
          alert(response.message);
      }
};



    return(
  <>
      <div className="banner banner_login">
      <div className="wrapper">
      <div className="banner_content ">
        <h1>{t('login.login')}</h1>
       </div>
      </div>
     </div>
     
    <div className="class-card-login wrapper">
         
            <Row className="d-flex justify-content-center">
               <h1 className="d-flex justify-content-center mt-5 "><i className="fa fa-user fa-2x"></i></h1>
            <Col className="d-flex justify-content-center">
                  <div className="d-flex">
                    <form className="login-form" onSubmit={e=>handleSubmit(e)}>
                      <div className="form-group p-3">
                          <Row >
                                <Col xs = {2} lg={2}>
                                      <i className="fa fa-envelope d-inline fa-2x"></i>
                                </Col>
                                <Col xs = {10} lg={10}>
                                    <input
                                      type="text"
                                      className="form-control rounded-left"
                                      placeholder={t('login.email')}
                                      onChange = {(e)=>setLoginData({...loginData,email:e.target.value})}
                                    />
                                    {error['vaildEmail'] ? <label className="text-danger">Not valid email</label> : "" }
                                </Col>
                          </Row>
                    
                          <Row className = "my-3">
                                <Col xs = {2} lg={2}>
                                    <i className="fa fa-key fa-2x"></i>
                                </Col>
                                <Col xs = {10} lg={10}>
                                    <input
                                    type="password"
                                    className="form-control rounded-left"
                                    placeholder={t('login.password')}
                                    onChange = {(e)=>setLoginData({...loginData,password:e.target.value})}
                                    />
                                    {error['wrongPass'] ? <label className="text-danger">Wrong password</label> : "" }
                                </Col>
                          </Row>

                          <Row>
                                <div className="form-group">
                                      <button
                                        type="submit"
                                        className="form-control btn btn-primary rounded submit px-3"
                                      >
                                       {t('login.login')}
                                      </button>
                                </div>
                                <div className="form-group d-md-flex mt-3">
                                      <div className="d-line text-md-right " >
                                          <Link to ="/forgotpassword"> {t('login.forgot_password')}</Link>
                                      </div>
                                </div>
                          </Row>
                      </div>
                    </form>
                  </div>
            </Col>  
      </Row>
    </div>
  </>
    );
}
export default Login;