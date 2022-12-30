import  React,{ useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const withAdminAuth = (WrappedComponent,requiredRole) => {
  
  return (props) => {
    const token = localStorage.getItem('token');
     const role = localStorage.getItem('role');
    const navigate = useNavigate();
    useEffect(() => {
      if (!token || role !== requiredRole) {
       navigate('/login');
      // localStorage.setItem("login",false);
       console.log(props);
      }
    }, [token],role);
    if (!token || role !== requiredRole) {
    // localStorage.setItem("login",false);
     return null;
    }
    return <WrappedComponent {...props} />;
  }
};

export default withAdminAuth;