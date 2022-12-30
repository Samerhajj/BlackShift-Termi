import React from "react"

// --> useTranslation we use it to be able to translate in react-i18next
import { useTranslation } from 'react-i18next';


const ForgotPassword = () =>{
 const {t} = useTranslation();
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
             placeholder={t('forgot_password.email')}/>
             <button className="d-block btn btn-primary mt-5 w-100">{t('forgot_password.reset_password')}</button>
             </div>
       </div>
       </>
    );
}


export default ForgotPassword;