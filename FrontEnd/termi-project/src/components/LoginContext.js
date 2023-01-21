import React, { createContext, useState,useEffect } from 'react';
import axios from "axios";

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
        const res = await axios.get("http://dir.y2022.kinneret.cc:7013/user/getUserData", {
          headers: { 'x-auth-token': token }
        });
        console.log("****UPDATED DATA*****");
        console.log(res.data.data);
        setUserData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
   
   
  // --> The first time to load the page we get the login from the localStorage
    useEffect(() => {
        const storedLogin = localStorage.getItem('login');
        
        if(storedLogin == null){
          localStorage.setItem('login', false)
        }
        
        // --> if the status of login = true → set the value in the context to true
        // make a call to your backend to retrieve the user data
          // using the JWT token stored in local storage
          // once you have the user data, update the state
          // and pass it down to the context
        console.log(storedLogin);
      if (storedLogin) {
          localStorage.setItem('searchCounter', 0);
          setLogin(storedLogin);
          // --> make a request to the backend to get the user data
          getUserData();
        }
      },[]);
      
    useEffect(() => {
      getUserData();
    }, [localStorage.getItem('token')]);


  // --> the values that we provide is {login , setLogin}
  return (
    <LoginContext.Provider value={{ login, setLogin ,userData, setUserData}}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;