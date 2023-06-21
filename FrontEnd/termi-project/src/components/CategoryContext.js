import React, { createContext, useState,useEffect } from 'react';

// APIs
import CategoryApi from '../api/CategoryAPI';
import NotificationsAPI from '../api/NotificationsAPI';

// --> create LoginContext context 
export const CategoriesContext = createContext();

const CategoriesProvider = (props) => {
  
  // --> create a state to hold the login status
    const [categories, setCategories] = useState([]);
 
 
    const getCategories = async () => {
        const res = await CategoryApi.getAllCategories();
        if(res.success){
            setCategories(res.body);
        }else{
            NotificationsAPI.errorNotification(res.message);
        }
    };
   
   
  // --> The first time to load the page we get the login from the localStorage
    useEffect(() => {
        getCategories();
    },[]);
    
  // --> the values that we provide is {login , setLogin}
  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;