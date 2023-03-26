import React, { useState } from "react";
import axios from "axios";
// --> useTranslation we use it to be able to translate in react-i18next
import { useTranslation } from 'react-i18next';
import AuthAPI from '../api/AuthAPI';

const ForgotPassword = () =>{
 const {t} = useTranslation();
  const [email, setEmail] = useState("");

   const handleResetPassword = async () => {
    try {
      const res = await AuthAPI.forgotPassword({email})
    
     
    } catch (err) {
    console.log(err);
    }
  };
  
   const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

 return (
  <>
   <div className="banner banner_login">
      <div className="wrapper">
      <div className="banner_content ">
      </div>
      </div>
      </div>
     <div className="d-flex justify-content-center">
           <div className="">
             <h1 className="">{t('forgot_password.forgot_password')}</h1>
             <h6 className ="information-text">{t('forgot_password.text')}</h6>
             <input 
             className="form-control rounded-left"
             type="email"
             name="user_email"
             id="user_email"
             onChange={handleEmailChange}
             value={email}
             placeholder={t('forgot_password.email')}/>
             <button onClick={handleResetPassword} className="d-block btn btn-primary mt-5 w-100">{t('forgot_password.reset_password')}</button>
             </div>
       </div>
       </>
    );
}


export default ForgotPassword;