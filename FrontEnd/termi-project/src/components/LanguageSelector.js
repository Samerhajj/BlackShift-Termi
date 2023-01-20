import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import LanguageMap from '../api/LanguageAPI';
import axios from 'axios';
import UserAPI from '../api/UserAPI';

const LanguageSelector = () => {
console.log(document.title)
   const [buttonStyle, setButtonStyle] = useState({});
    const selectedLanguage = Cookies.get("i18next") || "en";
    const { i18n } = useTranslation();
     const [previousLanguage, setPreviousLanguage] = useState(selectedLanguage);

  // React.useEffect(() =>{
  //     document.body.dir = i18n.dir(selectedLanguage);
  //     localStorage.setItem("currentLanguage",selectedLanguage);
  //     {/*
  //     //         let location = useLocation();
  //     //   console.log(location.pathname);
  //     //   return <div>The current URL is: {location.pathname}</div>;
              
              
  //         //   console.log(`current language is : ${selectedLanguage} `)
  //         //   localStorage.setItem("currentLanguage",selectedLanguage);
  //         //   const current = new Date();
  //         //   const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.toLocaleTimeString()}`;
  //         //   console.log("The data and the hour that the user change the language")
  //         //   console.log(date);
  //         //   const page  = document.title;
            
          
  //         // const cLang = localStorage.getItem('currentLanguage');
  //         // const pLang = localStorage.getItem('previousLanguage');
  //         // const sCount = parseInt(localStorage.getItem('searchCounter'));
  //         // // const email = JSON.parse(localStorage.getItem('profileBody'))['email'];
          
          
  //         // // if((localStorage.hasOwnProperty('profileBody'))['email']){
  //         // // const email = JSON.parse(localStorage.getItem('profileBody'))['email'];// this right
  //         // const email = "m7md@gmail.com";// comment this 
  //         // const activity = "Change Language";
  //         // const data = { cLang, pLang, current,email,activity,page,sCount };
      
  //         // const postData = async () => {
  //         // const result = await axios.post("http://dir.y2022.kinneret.cc:7013/user/active-lag", data);
  //         // if(result.status == 200){
  //         //       localStorage.setItem("searchCounter",0 );
  //         //       console.log(result);
  //         // }
          
  //         // }
  //         // postData();
  //   */}
  //         //I added this function in order to use async and await .
  //     const fun = async()=>{
  //       const page  = document.title;
  //       const response = await UserAPI.languageChanged("Change Language",page);
  //       console.log(response);
  //       if(response.success){
  //           localStorage.setItem("searchCounter",0 ,true);
  //         }else{
  //           console.log(response.message);
  //         }
  //       }//End of fun()
        
  //     fun();// Call the function
  
  // }, [selectedLanguage]);//End of useEffect
  

  
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

   async function fun(){
          const page  = document.title;
          const response = await UserAPI.languageChanged("Change Language",page);
          console.log(response);
          if(response.success){
              localStorage.setItem("searchCounter",0 ,true);
            }else{
              console.log(response.message);
            }
          //End of fun()
          }

};
export default LanguageSelector;


 // <Button className="m-0 p-2" variant="transparent" key={language} onClick={() =>{
 //             i18n.changeLanguage(language);
 //           }}>
 //           <Image className="img-fluid" src={LanguageMap[language].src}/>
 //         </Button>