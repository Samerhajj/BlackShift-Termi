
import React,{useEffect} from 'react';
import { useLocation, Route } from 'react-router-dom';


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