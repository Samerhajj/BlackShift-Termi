import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
  try {
  const urlParams = window.location.pathname.split('/');
  const token = urlParams[urlParams.length - 1];
  const response = await axios.get(`${process.env.React_App_BaseURL}auth/verify/${token}`);
  const { message, isVerified } = response.data; // assuming the response includes a boolean flag indicating if the user is verified
  console.log(response.data)
  if (isVerified) {
    setMessage('User is already verified. Please login.');
  } else {
    setMessage(message);
  }
} catch (error) {
  setMessage(error.response.data.message);
}

    };

    verifyEmail();
  }, []);

  return (
    <>
      <div className="banner banner_login">
        <div className="wrapper">
          <div className="banner_content">
        
      <h1>Verification Page</h1>

          </div>
        </div>
      </div>
      <div className="verification-message">
      <p className="message">{message}</p>
    </div>
     <style jsx>{`
        .verification-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .message {
          font-size: 2em;
          font-weight: bold;
          text-align: center;
          color: red;
        }
      `}</style>
    </>
  );
};

export default VerifyPage;
