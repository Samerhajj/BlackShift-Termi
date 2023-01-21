import  React,{ useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const withNotAuth = (WrappedComponent) => {
  return (props) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
      if (token) {
        // User is logged in, redirect to home page
        navigate('/');
      }
      else{
               localStorage.setItem("login",false);

      }
    }, [token]);
    
    if (token) {
      return null;
    }
    return <WrappedComponent {...props} />;
  }
};

export default withNotAuth;