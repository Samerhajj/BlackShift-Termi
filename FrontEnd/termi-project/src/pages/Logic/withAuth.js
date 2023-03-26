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
    }, [token]);//end of useEffect
    if (!token) {
     localStorage.setItem("login",false);
     return null;
    }
    return <WrappedComponent {...props} />;
  }//end of return
};

export default withAuth;