
  // import React,{ useEffect,useRef}from 'react';
  
  // function hamburgerLogic() {
  //   const hamburgerRef=useRef(null);
  //   const mobileMenuRef=useRef(null);
    
  //   useEffect(() => {
  //     const toggleHamburger = () => {
  //         hamburgerRef.current.classList.toggle('active');
  //         mobileMenuRef.current.classList.toggle('active');
  //         console.log('HELLO');
  //     };  
      
  //     mobileMenuRef.current.querySelectorAll('a').forEach(a=>{
  //       a.addEventListener('click',toggleHamburger);
  //     });
     
  //     hamburgerRef.current.addEventListener('click', toggleHamburger);
      
  //     return() => {
  //       hamburgerRef.current.removeEventListener('click', toggleHamburger);
      
  //     mobileMenuRef.current.querySelectorAll('a').forEach(a=>{
  //       a.removeEventListener('click',toggleHamburger);
  //     });
  //       };
  //   }, []);
  //   return{hamburgerRef,mobileMenuRef}
  // }
  // export default hamburgerLogic;
  
  import React, { useEffect, useRef } from 'react';


/*In this version of the code, the children property
of the mobileMenuRef.current element is used to access
the links, and event listeners are attached to each
of the links using a loop. This eliminates the need
to use querySelectorAll and simplifies the code.
*/
function hamburgerLogic() {
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const toggleHamburger = () => {
      hamburgerRef.current.classList.toggle('active');
      mobileMenuRef.current.classList.toggle('active');
      console.log('HELLO');
    };

    Array.from(mobileMenuRef.current.children).forEach((child) => {
      child.addEventListener('click', toggleHamburger);
    });

    hamburgerRef.current.addEventListener('click', toggleHamburger);

    return () => {
      hamburgerRef.current.removeEventListener('click', toggleHamburger);

      Array.from(mobileMenuRef.current.children).forEach((child) => {
        child.removeEventListener('click', toggleHamburger);
      });
    };
  }, []);
  return { hamburgerRef, mobileMenuRef };
}

export default hamburgerLogic;