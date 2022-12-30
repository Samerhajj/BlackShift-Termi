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

const MyComponent = React.lazy(() => new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./App'));
    }, 1500);
  }));

function Wrapper() {
  return (
    <Suspense fallback={<div className="spinner">Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <React.StrictMode>
      <Wrapper/>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

  // {/*<div className="m-5">
  // Loading...
  
  // </div>*/}
