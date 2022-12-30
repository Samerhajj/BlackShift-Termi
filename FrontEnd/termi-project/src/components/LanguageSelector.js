import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import LanguageMap from '../api/LanguageAPI';

const LanguageSelector = () => {
  
   const [buttonStyle, setButtonStyle] = useState({});
    const selectedLanguage = Cookies.get("i18next") || "en";
    const { i18n } = useTranslation();
    
    React.useEffect(() =>{
        document.body.dir = i18n.dir(selectedLanguage);
    }, [selectedLanguage]);
    
    return(
      <div className="d-flex gap-1">
        {Object.keys(LanguageMap).map((language) => (
         <Button 
          className="m-0 p-2"
          variant="transparent"
          key={language}
          onClick={() => {
              i18n.changeLanguage(language);
          }}
          onMouseDown={() => {
              // Change the style of the button when the mouse is pressed down
              setButtonStyle({
                  backgroundColor: '#ccc',
                  cursor: 'grabbing',
                  transform: 'scale(0.95)'
              }); 
          }}
          onMouseUp={() => {
              // Set the style of the button back to the original style when the mouse is released
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
};
export default LanguageSelector;


 // <Button className="m-0 p-2" variant="transparent" key={language} onClick={() =>{
 //             i18n.changeLanguage(language);
 //           }}>
 //           <Image className="img-fluid" src={LanguageMap[language].src}/>
 //         </Button>