// -->  `Suspense` component is used to delay the rendering of a component until some asynchronous data has been loaded.
// -->  in this case, we have a div that told us that the page is Loading...
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Loader from 'react-trope-loader'
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./i18nextInit";
import UserAPI from "./api/UserAPI";



// import AddToHomescreen from 'react-add-to-homescreen';

import LoginProvider from "./components/LoginContext";
import CategoriesProvider from "./components/CategoryContext";


const MyComponent = React.lazy(() => new Promise(resolve => {
    // UserAPI.getUserData().then((data) => {
    //     console.log(data);
    // });
    
  const token = localStorage.getItem('token');

  if (!token) {
    // Token is not found in local storage
    // Handle the error accordingly
  } else {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      // Invalid token format
      // Handle the error accordingly
    } else {
      const decodedToken = JSON.parse(atob(tokenParts[1]));
      const expirationDate = new Date(decodedToken.exp * 1000);
      if (expirationDate <= new Date()) {
        // Token is expired, remove it from local storage
        localStorage.removeItem('token');
      } else {
        // Token is still valid, proceed with the application logic
      }
    }
  }
    


    
    setTimeout(() => {
      resolve(import('./App'));
    }, 1500);
  }));

function Wrapper() {
  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <MyComponent />
    </Suspense>
  );
}
//const [userData, setUserData] = React.useState({});


// UserAPI.getUserData().then((data) => {
//   // console.log(data.body.data);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <>
     <LoginProvider>
       <CategoriesProvider>
          <Wrapper/>
        </CategoriesProvider>
      </LoginProvider>
    </>

);
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

  // {/*<div className="m-5">
  // Loading...
  
  // </div>*/}
  // <Provider store={store}>
  //       <PersistGate loading={null} persistor={persistor}>
  //     <Wrapper/>
  //     </PersistGate>
  //     </Provider>