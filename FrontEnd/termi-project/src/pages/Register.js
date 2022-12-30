import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// --> styles
import RegisterToTermi from "../images/RegisterToTermi.gif";
import Image from 'react-bootstrap/Image';
import styles from "../styles/RegisterPage.css";

// --> APIs
import AuthAPI from '../api/AuthAPI';

const Register = () =>{

  const navigate = useNavigate();
  const {t} = useTranslation();
  const [data,setData] = useState({fullName:"",phone:"",language:"",email:"",password:"",field:"",favorite:[]});
  
  // Handle the button click to register
    const handleSubmit = async () => {
      const response = await AuthAPI.register({data:data});
      if(response.success){
         navigate('/login');
      }
      else{
          alert(response.message);
      }
  };
  
    return(
      <>
      <div className="banner banner_login">
      <div className="wrapper">
     <div className="banner_content">
      <h1>{t('register.register')}</h1>
     </div>
     </div>
     </div>
    <div className="class-card-register wrapper">
      <div className="d-flex justify-content-center">
        <form className="login-form">
         <div className="form-group my-3">
            <input
              type="text"
              className="form-control rounded-left"
              placeholder={t('register.full_name')}
              onChange={(e)=>setData({...data,fullName : e.target.value})}
            />
          </div>
          
         <div className="form-group my-3">
            <input
              type="text"
              className="form-control rounded-left"
              placeholder={t('register.phone')}
              onChange={(e)=>setData({...data,phone:e.target.value})}
            />
          </div>
        
          <div className="form-group my-3">
            <input
              type="text"
              className="form-control rounded-left"
              placeholder={t('register.email')}
              onChange={(e)=>setData({...data,email:e.target.value})}
            />
          </div>
          
          <div className="form-group d-flex my-3">
            <input
              type="password"
              className="form-control rounded-left"
              placeholder={t('register.password')}
              onChange={(e)=>setData({...data,password:e.target.value})}
            />
          </div>
          
        <select
            style={{ width: 200 }}
            className="form-select w-100"
            aria-label="Default select example"
            id="lang"
            onChange={(e)=>setData({...data,field:e.target.value})}
          >
            <option value="Select">{t('register.select_category')}</option>
            <option value="Programming">{t('register.option_one')}</option>
            <option value="Medicine">{t('register.option_two')}</option>
            <option value="Human_Resources">{t('register.option_three')}</option>
      </select>
          
        <select 
            style={{ width: 200}}
            className="form-select w-100 mt-3"
            aria-label="Default select example"
            id="lang"
            onChange={(e)=>setData({...data,language:e.target.value})}
          >
            <option value="Select">{t('register.select_lang')}</option>
            <option value="English">{t('register.lang_en')}</option>
            <option value="Arabic">{t('register.lang_ar')}</option>
            <option value="Hebrew">{t('register.lang_he')}</option>
      </select>
          
          
          <div className="form-group">
            <button
              type="button"
              className="form-control btn btn-primary rounded submit px-3 mt-5"
              onClick={handleSubmit}
            >
            {t('register.register')}
            </button>
          </div>
        </form>
        <br/><br/><br/><br/><br/><br/>
    </div>
    </div>
    </>
    );
}
export default Register