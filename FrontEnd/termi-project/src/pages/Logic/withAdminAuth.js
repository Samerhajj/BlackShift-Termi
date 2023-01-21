import  React,{ useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginContext} from "../../components/LoginContext";
// const withAdminAuth = (WrappedComponent,requiredRole) => {
  
//   return (props) => {
//     const token = localStorage.getItem('token');
//      const role = localStorage.getItem('role');
//     const navigate = useNavigate();
//     useEffect(() => {
//       if (!token || role !== requiredRole) {
//       navigate('/login');
//       // localStorage.setItem("login",false);
//       console.log(props);
//       }
//     }, [token],role);
//     if (!token || role !== requiredRole) {
//     // localStorage.setItem("login",false);
//      return null;
//     }
//     return <WrappedComponent {...props} />;
//   }
// };

const withAdminAuth = (WrappedComponent, requiredRole) => {
  return (props) => {
     const { userData } = useContext(LoginContext);
    const navigate = useNavigate();
    console.log(userData.role);
    
    useEffect(() => {
      if (!userData || userData.role !== requiredRole) {
        navigate('/login');
      }
    }, [userData]);

    if (!userData || userData.role !== requiredRole) {
      return null;
    }
    return <WrappedComponent {...props} />;
  }
};

export default withAdminAuth;