

// import React,{ useEffect,useRef} from 'react';

// const FocusInput = () => {
   
//   export const handleVist =() =>{
//     const inputEl = useRef(null);

//     useEffect(() => {
//     inputEl.current.focus();
//   }, []);

//     return inputEl;
//   }
   
   
   
//     return<div></div>

// }
// export default FocusInput;


import React,{ useEffect,useRef} from 'react';

   export const handleVist =() =>{
    const inputEl = useRef(null);

    useEffect(() => {
    inputEl.current.focus();
  }, []);

    return inputEl;
   }
export default handleVist;
