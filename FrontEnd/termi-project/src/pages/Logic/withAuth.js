import  React,{ useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  
  return (props) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
      if (!token) {
       navigate('/login');
       localStorage.setItem("login",false);
       console.log(props);
      }
    }, [token]);
    if (!token) {
     localStorage.setItem("login",false);
     return null;
    }
    return <WrappedComponent {...props} />;
  }
};

export default withAuth;