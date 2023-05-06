import React,{useState,useContext} from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import LanguageMap from "../../api/LanguageAPI";
import style from "./TermCard.css";
import Image from 'react-bootstrap/Image';
import json2csv from 'json2csv';
import fileDownload from 'js-file-download';
import { useNavigate } from "react-router-dom";
import Rating from 'react-star-ratings';


//import { useSpeechSynthesis } from 'react-speech-kit';

import { TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon,FacebookShareButton, FacebookIcon,LinkedinShareButton, LinkedinIcon  } from 'react-share';

// --> APIs
import UserApi from '../../api/UserAPI';
import AdminAPI from '../../api/AdminAPI';
import NotificationsAPI from '../../api/NotificationsAPI';

import DeleteTermModal from './DeleteTermModal';

// --> Import Icons
import { BsStarFill, BsStar } from 'react-icons/bs';
import { LoginContext } from '../LoginContext';
import { FaMicrophone } from 'react-icons/fa';
import { CiCircleRemove } from "react-icons/ci";

// import PropTypes from 'prop-types';
import { IconContext } from "react-icons";
import { AiTwotoneEdit } from 'react-icons/ai';

const TermCard = (props) =>{
    console.log(props.term);
    const { t } = useTranslation();
    const [language, setLanguage] = useState(props.initialLanguage);
    const [isFav, setIsFav] = useState(props.isFavorite);
    const [isSearch,setIsSearch] = useState(props.isSearch);
    const {userData,setUserData} = useContext(LoginContext);
    const navigate = useNavigate();
    
    //Data to share with social media
   const shareData = {
    text: 'Check out this cool data!',
    url: window.location.href,
    hashtags: ['react', 'twitter'],
    title: 'Check out this cool data!',
    separator: ' - ',
  };
  

// const voices = window.speechSynthesis.getVoices();
// const englishVoice = voices.find((voice) => voice.lang === 'en-US');
// const arabicVoice = voices.find((voice) => voice.lang === 'ar-SA');
// const hebrewVoice = voices.find((voice) => voice.lang === 'he-IL');

const handle_starsClick = async() =>{
        if(!isFav){
            const res = await UserApi.addFavorite(props.term._id,userData._id);
            if(res.success){
                if(props.setParentList){
                    props.setParentList([...res.body.updatedList]);
                }else{
                    setIsFav(res.body.isAdded);
                    if(res.body.isAdded){
                        NotificationsAPI.successNotification("Added to favorites");
                    }
                }
                setUserData({...userData,favorite: res.body.updatedList});
            }else{
                NotificationsAPI.errorNotification(res.message);
            }
        }else{
            const res = await UserApi.deleteFavorite(props.term._id,userData._id);
            if(res.success){
                if(props.setParentList){
                    props.setParentList([...res.body.updatedList]);
                }else{
                    setIsFav(!res.body.isDeleted);
                    if(res.body.isDeleted){
                        NotificationsAPI.successNotification("Removed from favorites");
                    }
                }
                setUserData({...userData,favorite: res.body.updatedList});
            }else{
                alert(res.message);
            }
        }
    };
 
// Text to speach
{/*
    const languageVoices = {
  english: { voiceURI: 'Microsoft Zira Desktop - English (United States)', lang: 'en-US' },
  hebrew: { voiceURI: 'Microsoft David Desktop - Hebrew', lang: 'he-IL' },
  arabic: { voiceURI: 'Microsoft Hoda Desktop - Arabic', lang: 'ar-SA' }
};

  
   const { speak } = useSpeechSynthesis();
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synthesis = window.speechSynthesis;
if (!recognition || !synthesis) {
  console.log("Web Speech API is not supported in this browser");
  return;
}



const languageVoices = {
  en: { lang: 'en-US' },
  he: { lang: 'he-IL' },
  ar: { lang: 'ar-SA' }
};

const handleSpeak = () => {
  const textToSpeak = props.term.conceptName[LanguageMap[language].name];
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  const voices = speechSynthesis.getVoices();
  const matchingVoices = voices.filter((voice) => voice.lang === languageVoices[language].lang);

  if (matchingVoices.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingVoices.length);
    const voice = matchingVoices[randomIndex];
    utterance.voice = voice;
  } else {
    console.error(`No matching voice found for language: ${language}`);
  }

  speechSynthesis.speak(utterance);
};

    
  const textToSpeak = props.term.conceptName[LanguageMap[language].name]
  
  if (language === 'en') {
    speak({ text:textToSpeak, voice: englishVoice });
  } else if (language === 'ar') {
    speak({ text: textToSpeak, voice: arabicVoice });
  } else if (language === 'he') {
    speak({ text: textToSpeak, voice: hebrewVoice });
  }
};
*/}

  
//TRENDING CONSTS
const today = new Date();
const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
const isTrending = props.term.searchCount >= 50 && new Date() >= weekStart && new Date() <= weekEnd;

// Get the date of the last reset from localStorage
const lastReset = localStorage.getItem('searchCounterReset');

// Check if the last reset was today
const today1 = new Date().toISOString().slice(0, 10);
const needsReset = lastReset !== today;

// Reset the counter if necessary
if (needsReset) {
  localStorage.setItem('searchCounterReset', today);
  // Reset the hidden search counter here
}

    
//send if he changed the termcard language and what card he changed and to what language he changed
let data = JSON.parse(localStorage.getItem("termCardLanguage")) || [];


const changeLanguage = async (newLanguage) => {
    if(newLanguage!==language){
        const res = await UserApi.languageChanged(userData.email,"Change concept language",document.title,false,newLanguage,language);
        if(res.success){
            console.log(res);
        }else{
            console.log(res.message);
        }
        setLanguage(newLanguage);
        data = data.concat({term: props.term.conceptName["english"], language: newLanguage});
        localStorage.setItem("termCardLanguage", JSON.stringify(data));
    }
};


const exportData = () => {
    // Get the data from Local Storage
    data = JSON.parse(localStorage.getItem("termCardLanguage")) || [];
    // Define the fields that you want to include in the CSV file
    const fields = ['term', 'language'];
    // Define the options for the json2csv parser
    const opts = { fields };
    // Convert the data to CSV format
    const csv = json2csv.parse(data, opts);
    // Download the CSV file
    fileDownload(csv, "termCardChanges.csv");
};

const handleCardEdit = () =>{
    let term = props.term;
    navigate("/admin/add-term", {
        state: {
          _id: term._id,
          selectedCategory: term.categories ? term.categories[0]: undefined,
          conceptName:{
            english: term.conceptName ? term.conceptName.english: undefined,
            arabic: term.conceptName ? term.conceptName.arabic: undefined,
            hebrew: term.conceptName ? term.conceptName.hebrew: undefined,
          },
          shortDefinition:{
            english: term.shortDefinition ? term.shortDefinition.english: undefined,
            arabic: term.shortDefinition ? term.shortDefinition.arabic: undefined,
            hebrew: term.shortDefinition ? term.shortDefinition.hebrew: undefined,
          },
          longDefinition:{
            english: term.longDefinition ? term.longDefinition.english: undefined,
            arabic: term.longDefinition ? term.longDefinition.arabic: undefined,
            hebrew: term.longDefinition ? term.longDefinition.hebrew: undefined,
          },
          suggestedBy: term.suggestedBy,
          readMore: term.readMore
        }
    });
    
}

    return(
        <div className="term-card" dir="ltr">
        {/*<div className="term-card-trending"/>*/}
        
                {
                props.role === "admin" && (
                <div onClick = {null}>
                    <DeleteTermModal id={props.term._id}/>
                </div>
                    )
                }
            <div className="language-selector">
                {
                    Object.keys(LanguageMap).map((language) => (
                        <div className="m-0 p-2 language-btn" key={language} onClick={() => {changeLanguage(language)}}>
                            <Image className="img-fluid" src={LanguageMap[language].src}/>
                        </div>
                    ))
                } 
            </div>
            <div className="term-box">
               {isTrending && (
                      <span className="fs-2" role="img" aria-label="trending">
                        🔥
                      </span>
                    )}
                <div className="categories-box">
                    {
                    (isSearch)  &&
                        props.categories.data.map((item, index)=>{
                            return(<div key={index} className="category-tag">{item[LanguageMap[language].name]}</div>);
                        })
                    }
                    
                    {
                        localStorage.getItem("login") === 'true' ? (
                            isFav ? (
                                <BsStarFill className="star-filled" onClick={()=>{handle_starsClick()}}/>
                            ):(
                                <BsStar className="star-outline" onClick={()=>{handle_starsClick()}}/>
                            )
                        ) : (null)
                    }
                </div>
                {
                    props.role === "admin" &&
                     (<div className="edit-admin" onClick = {handleCardEdit}> 
                  <IconContext.Provider value={{ size: "2rem" }}>
                      <AiTwotoneEdit/>
                  </IconContext.Provider>
                  </div>)

                }
                
         {/*
              <IconContext.Provider value={{ size: "2rem" }}>
                <button className="w-auto" onClick={handleSpeak}><FaMicrophone /></button>
              </IconContext.Provider>*/}
                  
                <div className="definitions-box">
                <div className="search-count">{t('searchTimes.search')} {props.term.searchCount} {t('searchTimes.times')}</div>
                    <h3 className="term-text" dir={LanguageMap[language].dir}>{props.term.conceptName[LanguageMap[language].name]}</h3>
                    <Accordion className="my-3 go-back-in-term-card" defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h2><strong className="font-weight-bold">{t('.')}</strong></h2></Accordion.Header>
                            <Accordion.Body dir={LanguageMap[language].dir}>{props.term.shortDefinition[LanguageMap[language].name]}</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h2><strong className="font-weight-bold">{t('...')}</strong></h2></Accordion.Header>
                        {props.term.longDefinition && props.term.longDefinition[LanguageMap[language].name] &&
                            <Accordion.Body dir={LanguageMap[language].dir}>{props.term.longDefinition[LanguageMap[language].name]}</Accordion.Body>
                            }
                        </Accordion.Item>
                    </Accordion>
                    
                <div>
                    <a className="read-url" href={props.term.readMore}>{t('search.read_more')}</a>
                        <p className="suggestedby-text">{t('search.suggested_by')} {props.term.suggestedBy}</p>
                    </div>
                    <div>
                        <Rating
                         rating={props.term.rating} // Pass the rating value as a prop
                         starRatedColor="gold" // Customize the color of the stars
                         numberOfStars={5} // Set the total number of stars
                         starDimension="20px" // Set the size of the stars
                         starSpacing="2px" // Set the spacing between the stars
                         changeRating={handle_starsClick} // Pass a callback function to handle the rating change
                        />
                    
                    </div>
                   <div className="d-flex justify-content-between p-3">
                       <FacebookShareButton className="w-auto" url={shareData.url} quote={shareData.quote}>
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton className="w-auto" url={'https://github.com/next-share'} title={shareData.text} hashtags={shareData.hashtags}>
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                       <WhatsappShareButton
                          url={shareData.url}
                        title={shareData.title}
                          separator=":: "
                          >
                          <WhatsappIcon size={40} round />
                        </WhatsappShareButton>
                        <LinkedinShareButton className="w-auto" url={shareData.url} title={shareData.title}>
                            <LinkedinIcon size={40} round={true} />
                        </LinkedinShareButton>
                  </div>
                </div>
            </div>
        </div>
    );
};

//   initialLanguage: ,need to be added
// TermCard.propTypes = {
//   isFavorite: PropTypes.bool,
//   term: PropTypes.object,
//   searchCount: PropTypes.number.isRequired
// }


export default TermCard;

