// import React,{ useEffect}from 'react';

// export default function handleScroll() {
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         document.querySelector('header').classList.add('sticky');
       
//       } else {
//         document.querySelector('header').classList.remove('sticky');
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

// }


/*  This version of the handleScroll hook takes two arguments: scrollThreshold 
and className. It returns a ref that can be attached to an element. When the
window is scrolled, the hook adds or removes the className to the element 
based on the scrollThreshold.
OLD CODE
*/
import { useEffect, useRef } from 'react';

function HandleScroll(scrollThreshold, className) {
  const elementRef = useRef(null);


    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        elementRef.current.classList.add(className);
      } else {
        elementRef.current.classList.remove(className);
      }
    };
     useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold, className]);

  return elementRef;
}

export default HandleScroll;

// export default HandleScroll;

// import { useEffect, useRef } from 'react';
// import { useEventListener } from ' @use-it/event-listener';

// function HandleScroll(scrollThreshold, className) {
//   const elementRef = useRef(null);

//   useEventListener('scroll', () => {  
//     if (window.pageYOffset > scrollThreshold) {
//       elementRef.current.classList.add(className);
//     } else {
//       elementRef.current.classList.remove(className);
//     }
//   });

//   return elementRef;
// }

// export default HandleScroll;