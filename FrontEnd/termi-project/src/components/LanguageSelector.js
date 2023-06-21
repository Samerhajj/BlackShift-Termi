import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import LanguageMap from '../api/LanguageAPI';
import axios from 'axios';
import UserAPI from '../api/UserAPI';

import { LoginContext } from './LoginContext';

const LanguageSelector = () => {
    const {userData} = useContext(LoginContext);
    const [buttonStyle, setButtonStyle] = useState({});
    const selectedLanguage = Cookies.get("i18next") || "en";
    const { i18n } = useTranslation();
    const [previousLanguage, setPreviousLanguage] = useState(selectedLanguage);


  
    React.useEffect(() =>{
      document.body.dir = i18n.dir(selectedLanguage);
      localStorage.setItem("currentLanguage",selectedLanguage);
        //I added this function in order to use async and await .
        if(previousLanguage!==selectedLanguage)
        {
         
          fun();// Call the function
      
        setPreviousLanguage(selectedLanguage);
        console.log(previousLanguage);
      }
          },[i18n.language,previousLanguage]);
          

  //}, [selectedLanguage]);//End of useEffect
   
   return (
  <div className="d-flex gap-1">
    {Object.keys(LanguageMap)
      .filter(language => language !== selectedLanguage)
      .map(language => (
        <Button 
          className="m-0 p-2"
          variant="transparent"
          key={language}
          onClick={() => {
            i18n.changeLanguage(language);
          }}
          onMouseDown={() => {
            setButtonStyle({
              backgroundColor: '#ccc',
              cursor: 'grabbing',
              transform: 'scale(0.95)'
            }); 
          }}
          onMouseUp={() => {
            setButtonStyle({
              transition: 'transform 0.2s ease-out',
              transform: 'scale(1)'
            });
          }}
          style={buttonStyle}
        >
          <Image className="img-fluid" src={LanguageMap[language].src}/>
        </Button>
      ))}
  </div>
);

  async function fun() {
    const page = document.title;
    if (Object.keys(userData).length !== 0) { // Check if userData is not empty
        const response = await UserAPI.languageChanged(userData.email, "Change Language", page);
        console.log(response);
        if (response.success) {
            localStorage.setItem("searchCounter", 0, true);
        } else {
            console.log(response.message);
        }
    } else {
        console.log("User is not logged in.");
    }
}


};
export default LanguageSelector;
