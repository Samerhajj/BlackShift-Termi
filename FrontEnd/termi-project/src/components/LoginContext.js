 import React, { createContext, useState,useEffect } from 'react';


// const LoginContext = createContext({
//   login: false,
//   setLogin: () => {}
// });

// const LoginProvider = ({ children }) => {
//   const [login, setLogin] = useState(false);

//   return (
//     <LoginContext.Provider value={{ login, setLogin }}>
//       {children}
//     </LoginContext.Provider>
//   );
// };

// export { LoginContext, LoginProvider };






// --> create LoginContext context 
export const LoginContext = createContext();

const LoginProvider = (props) => {
  
  // --> create a state to hold the login status
  const [login, setLogin] = useState(false);

  // --> The first time to load the page we get the login from the localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem('login');
    
    if(storedLogin == null){
      localStorage.setItem('login', false)
    }
    
    // --> if the status of login = true → set the value in the context to true
    console.log(storedLogin);
    if (storedLogin) {
      console.log("in if " + storedLogin);
      setLogin(storedLogin);
    }
  },[]);

  // --> the values that we provide is {login , setLogin}
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;