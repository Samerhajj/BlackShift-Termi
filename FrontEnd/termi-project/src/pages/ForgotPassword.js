import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import AuthAPI from '../api/AuthAPI';
import validator from 'validator';

const ForgotPassword = () =>{
 const {t} = useTranslation();
 const [email, setEmail] = useState("");
 const [requestSent, setRequestSent] = useState(false);
 
  const [error, setError] = useState({
    validEmail: true,
    notExistMail: false
  });

   const handleResetPassword = async () => {
      if (email === '') {
      setError({ ...error, validEmail: false,notExistMail:false});
      console.log("hi")
      // return;
    }//if the email is empty
     if (!validator.isEmail(email)) {
      setError({ ...error, validEmail: false,notExistMail:false});
      return;
     } else {
      setError({ ...error, validEmail: true,notExistMail:false});
    }

    try {
      const res = await AuthAPI.forgotPassword({email})
      console.log(res)
      if (res.message === "Request failed with status code 404") {
           setError({ ...error, notExistMail: true ,validEmail:true });
          console.log("not exist mail")

      } else {
        setRequestSent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };// END handleResetPassword
  
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
             {requestSent ? (
              <div className="alert alert-success" role="alert">
                {t('forgot_password.check_inbox')}
              </div>
             ) : (
             <>
             <h6 className ="information-text">{t('forgot_password.text')}</h6>
             <input
             className="form-control rounded-left"
             type="email"
             name="user_email"
             id="user_email"
             onChange={handleEmailChange}
             value={email}
             placeholder={t('forgot_password.email')}/>
             <button id="id_rest_password_button" onClick={handleResetPassword} className="d-block btn btn-primary mt-5 w-100">{t('forgot_password.reset_password')}</button>
             </>)}
             {error['validEmail'] ? null : <label id="id_error_message_rest_password_validEmail" className="text-danger"> Not valid email </label> }
             {!error['notExistMail'] ? null : <label id="id_error_message_rest_password_notExistMail" className="text-danger">your mail not in our database</label> }

             </div>
       </div>
       </>
    );
}

export default ForgotPassword;
