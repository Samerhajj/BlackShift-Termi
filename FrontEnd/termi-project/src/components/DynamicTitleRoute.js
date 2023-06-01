
import React,{useEffect} from 'react';
import { useLocation, Route } from 'react-router-dom';

//In order to change the title of the tab when you nav from page to page
const DynamicTitleRoute = ({title,element})=> {

 const location = useLocation();  
  //const isProtectedRoute = location.pathname !== '/login' && location.pathname !== '/register';
  useEffect(() => {
    
    //if (isProtectedRoute) {
      document.title = title;
      console.log(location.pathname);
//    }
  }, [title]);
  return element;
};

export default DynamicTitleRoute;


//const {pathname}=useLocation();
//  useEffect(() => {
//   document.title=title;
// },[title]);

// return element;
// }