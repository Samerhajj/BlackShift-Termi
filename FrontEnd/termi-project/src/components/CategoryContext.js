import React, { createContext, useState,useEffect } from 'react';

// APIs
import CategoryApi from '../api/CategoryAPI';

// --> create LoginContext context 
export const CategoriesContext = createContext();

const CategoriesProvider = (props) => {
  
  // --> create a state to hold the login status
    const [categories, setCategories] = useState([]);
 
 
    const getCategories = async () => {
        const res = await CategoryApi.getAllCategories();
        if(res.success){
            console.log(res.body);
            setCategories(res.body);
        }else{
            alert(res.message);
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