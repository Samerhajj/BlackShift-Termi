import { useState,useEffect } from 'react';
import authapi from '../../api/AuthAPI';

import validator from 'validator';


const LoginHook = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ wrongPass: false, validEmail: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate login data here...
    if (!validator.isEmail(loginData.email)) {
      setError({ ...error, validEmail: true });
      return;
    } else {
      setError({ ...error, validEmail: false });
    }

    if (loginData.password.length < 6) {
      setError({ ...error, wrongPass: true });
      return;
    } else {
      setError({ ...error, wrongPass: false });
    }

    // Make API call to login
    const response = await authapi.login(loginData);

    if (response.success) {
      setIsLoggedIn(true);
    } else {
      alert(response.message);
    }
  };

  return { loginData, error, isLoggedIn, setLoginData, handleSubmit };
};

export default LoginHook;