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
//import {getUserData} from "./api/UserAPI";
///blackshift/FrontEnd/termi-project/src/api/UserAPI.js
///blackshift/FrontEnd/termi-project/src/index.js
import UserAPI from "./api/UserAPI";
// import { store, persistor } from './redux/store';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'


import LoginProvider from "./components/LoginContext";
const MyComponent = React.lazy(() => new Promise(resolve => {
    // UserAPI.getUserData().then((data) => {
    //     console.log(data);
    // });
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
  
    <React.StrictMode>
     <LoginProvider>
      {/*login={localStorage.getItem('login')}
      userData={data.body.data}>*/}
      <Wrapper/>
        </LoginProvider>
    </React.StrictMode>

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