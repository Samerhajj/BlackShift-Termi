  import React, { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';//new

/*In this version of the code, the children property
of the mobileMenuRef.current element is used to access
the links, and event listeners are attached to each
of the links using a loop. This eliminates the need
to use querySelectorAll and simplifies the code.
*/
function hamburgerLogic() {
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { i18n } = useTranslation();//new



  useEffect(() => {
    const toggleHamburger = () => {
      hamburgerRef.current.classList.toggle('active');
      mobileMenuRef.current.classList.toggle('active');
      localStorage.setItem("previousLanguage",i18n.language)//new
      console.log(`previous Language is ${i18n.language}`)
      // console.log('HELLO');
    };

    Array.from(mobileMenuRef.current.children).forEach((child) => {
      child.addEventListener('click', toggleHamburger);
    });

    hamburgerRef.current.addEventListener('click', toggleHamburger);

    return () => {
         if (hamburgerRef.current) {
      hamburgerRef.current.removeEventListener('click', toggleHamburger);

      Array.from(mobileMenuRef.current.children).forEach((child) => {
        child.removeEventListener('click', toggleHamburger);
      });
    };
    }
  }, []);
  return { hamburgerRef, mobileMenuRef };
}

export default hamburgerLogic;
