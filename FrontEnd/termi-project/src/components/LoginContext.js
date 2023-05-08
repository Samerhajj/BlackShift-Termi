import React, { createContext, useState,useEffect } from 'react';
import axios from "axios";
import {user_getUserData} from '../api/ApiRoutes';


// user_getUserData
// --> create LoginContext context 
export const LoginContext = createContext();

const LoginProvider = (props) => {
  
  // --> create a state to hold the login status
    const [login, setLogin] = useState(false);
    const [userData, setUserData] = useState({});
 
 
    const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.get(user_getUserData, {
          headers: { 'x-auth-token': token }
        });
        console.log("****UPDATED DATA*****");
        console.log(res.data.data);
        setLogin(true);
        setUserData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
   
   
  // --> The first time to load the page we get the login from the localStorage
    useEffect(() => {
      
      
      if (login) {
          localStorage.setItem('searchCounter', 0);
         // // setLogin(storedLogin);
          // --> make a request to the backend to get the user data
          getUserData();
        }
      },[]);
      
    useEffect(() => {
      getUserData();
    }, [login]);
//[localStorage.getItem('token')]

  // --> the values that we provide is {login , setLogin}
  return (
    <LoginContext.Provider value={{ login, setLogin ,userData, setUserData}}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;