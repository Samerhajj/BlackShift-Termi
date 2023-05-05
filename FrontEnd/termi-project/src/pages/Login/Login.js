import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import { LoginContext } from '../../components/LoginContext';
import AuthAPI from '../../api/AuthAPI';
import 'font-awesome/css/font-awesome.min.css';
import { Row, Col } from 'react-bootstrap';
import LoginSytle from '../../styles/LoginStyle.css';
import NotificationsApi from '../../api/NotificationsAPI';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState({
    wrongPass: false,
    validEmail: false,
  });
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const { login, setLogin } = useContext(LoginContext);
  const [remember, setRemember] = useState(false);
  const [rememberUsername, setRememberUsername] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('rememberedEmail');
    if (email) {
      setLoginData({ ...loginData, email });
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (remember) {
      localStorage.setItem('rememberedEmail', loginData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    if (loginData['email'] === '' && loginData['password'] === '') {
      setError({ ...error, validEmail: true, wrongPass: true });
      return;
    }

    if (!validator.isEmail(loginData['email'])) {
      setError({ ...error, validEmail: true });
      return;
    } else {
      setError({ ...error, validEmail: false });
    }

    if (loginData['password'].length < 6) {
      setError({ ...error, wrongPass: true });
      return;
    } else {
      setError({ ...error, wrongPass: false });
    }

    const response = await AuthAPI.login(loginData);

    if (response.success) {
      setLogin(true);
      navigate('/');
    } else {
     NotificationsApi.errorNotification(response.message);
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
                                <div className="form-group form-check">
                                      <input type="checkbox" className="form-check-input" id="rememberUsername" checked={rememberUsername} onChange={() => setRememberUsername(!rememberUsername)} />
                                      <label className="form-check-label" htmlFor="rememberUsername">{"Remember username"}</label>
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