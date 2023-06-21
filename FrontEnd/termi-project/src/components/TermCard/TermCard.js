import React,{useState,useContext} from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import LanguageMap from "../../api/LanguageAPI";
import style from "./TermCard.css";
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";
import Rating from 'react-star-ratings';
import NewImg from '../../assets/images/Icons/New.png';
import TrendingImg from '../../assets/images/Icons/Trending.png';



//import { useSpeechSynthesis } from 'react-speech-kit';

import { TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon,FacebookShareButton, FacebookIcon,LinkedinShareButton, LinkedinIcon  } from 'react-share';

// --> APIs
import UserApi from '../../api/UserAPI';
import AdminAPI from '../../api/AdminAPI';
import NotificationsAPI from '../../api/NotificationsAPI';
import FeedbackAPI from '../../api/FeedbackAPI';

import DeleteTermModal from './DeleteTermModal';
import TermFeedbackModal from './TermFeedbackModal';

// --> Import Icons
import { BsStarFill, BsStar } from 'react-icons/bs';
import { LoginContext } from '../LoginContext';
import { FaMicrophone } from 'react-icons/fa';
import { CiCircleRemove } from "react-icons/ci";
import { IconContext } from "react-icons";
import { AiTwotoneEdit } from 'react-icons/ai';

// import PropTypes from 'prop-types';

const TermCard = (props) =>{
    console.log(props.term);
    const { t } = useTranslation();
    const [language, setLanguage] = useState(props.initialLanguage);
    const [isFav, setIsFav] = useState(props.isFavorite);
    const [isSearch,setIsSearch] = useState(props.isSearch);
    const {login, userData,setUserData} = useContext(LoginContext);
    const navigate = useNavigate();
    const [overallRating, setOverallRating] = useState(0);
    
    // const [shortTermRating, setShortTermRating] = useState(0);
    // const [longTermRating, setLongTermRating] = useState(0);
    // const [feedbackText,setFeedbackText] = useState("");
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

    // async function handleSubmit(event) {
    //   event.preventDefault();
    //   const { success, message } = await FeedbackAPI.addFeedback(
    //     overallRating,
    //     shortTermRating,
    //     longTermRating,
    //     feedbackText// Pass the short term feedback comment to addFeedback
    //   );
    //   if (success) {
    //     console.log("Feedback submitted successfully");
    //     // Reset the form state
    //     setShortTermRating(0);
    //     setLongTermRating(0);
    //     setFeedbackText("");
    //   } else {
    //     console.log("Feedback submission failed: ", message);
    //   }
    // }
    
    const handle_starsClick = async(e) =>{
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
                NotificationsAPI.errorNotification(res.message);
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
    
        
    //send if he changed the termcard language and what card he changed and to what language he changed
    // let data = JSON.parse(localStorage.getItem("termCardLanguage")) || [];
    
    const handleTermRatingChange = (value) => {
        setOverallRating(value);
    };
    
    const handleTermFeedbackSubmit = async (values) => {
      console.log(values);
      console.log(props.term._id);
      const respond = await FeedbackAPI.addFeedback(
        props.term._id,
        values.overallRating,
        values.shortTermRating,
        values.longTermRwating,
        values.feedbackText
      );
      if (respond.success) {
        NotificationsAPI.successNotification("Thank you for providing feedback");
      } else {
        NotificationsAPI.errorNotification("Failed to submit feedback");
      }
    };
    
   const changeLanguage = async (newLanguage) => {
    if (login) {
        if (newLanguage !== language) {
            const res = await UserApi.languageChanged(
                userData.email,
                "Change concept language",
                document.title,
                false,
                newLanguage,
                language
            );
            if (res.success) {
                console.log(res);
            } else {
                console.log(res.message);
            }
            setLanguage(newLanguage);
        }
    } else {
        console.log("User is not logged in.");
    }
};

    
    const handleCardEdit = () =>{
        let term = props.term;
        navigate("/admin/add-term", {
            state: {
              _idTerm: term._id,
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
            <div className="d-flex justify-content-between align-items-center">
                {props.role === "admin" && (
                    <div className="d-flex align-items-center gap-2">
                        <DeleteTermModal id={props.term._id} />
                        <IconContext.Provider value={{ size: "2.5rem" }}>
                          <AiTwotoneEdit className="edit-admin" onClick = {() => handleCardEdit()}/>
                        </IconContext.Provider>
                    </div>
                )}
               <div className="ms-auto d-flex gap-2">
                    {props.term.isTrending && (<Image style={{width: "3rem"}} src={TrendingImg} data-toggle="tooltip" data-placement="top" title="Trending Term"/>)}
                    {props.term.isNew ?<Image style={{width: "3.5rem"}} src={NewImg} data-toggle="tooltip" data-placement="top" title="New Term"/> : null} 
                </div>
            </div>
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
                   <h2 >{props.term.name}</h2>
                   <p>{props.term.definition}</p>
                
                <div className="categories-box">
                    {
                    (isSearch)  &&
                        props.categories.data.map((item, index)=>{
                            return(<div key={index} className="category-tag">{item[LanguageMap[language].name]}</div>);
                        })
                    }
                    
                    {
                        login ? (
                            isFav ? (
                                <BsStarFill className="star-filled" onClick={(e)=>{handle_starsClick(e)}}/>
                            ):(
                                <BsStar className="star-outline" onClick={(e)=>{handle_starsClick(e)}}/>
                            )
                        ) : (null)
                    }
                </div>
                
         {/*
              <IconContext.Provider value={{ size: "2rem" }}>
                <button className="w-auto" onClick={handleSpeak}><FaMicrophone /></button>
              </IconContext.Provider>*/}
                  
                <div className="definitions-box">
                <div  className="search-count">{t('searchTimes.search')} <span id="id_search_count_num">{props.term.searchCount} </span>{t('searchTimes.times')}</div>
                    <h3 id="id_term_card_title" className="term-text" dir={LanguageMap[language].dir}>{props.term.conceptName[LanguageMap[language].name]}</h3>
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
                    { login ? (
                        <div>
                          <Rating
                          rating={overallRating}
                          starRatedColor="gold"
                          numberOfStars={5}
                          starDimension="20px"
                          starSpacing="2px"
                          changeRating={handleTermRatingChange}
                          feedbackType="overallRating"/>
                            {(overallRating > 0 && overallRating <= 5) && (
                                    <TermFeedbackModal overallRating={overallRating} showModal={true} submitFeedback={(shortRating, longRating, feedbackText) => handleTermFeedbackSubmit(shortRating, longRating, feedbackText)}/>
                                )
                            }
                        </div>
                    ) : null}
                   <div className="d-flex justify-content-between p-3">
                       <FacebookShareButton className="w-auto" url={shareData.url} quote={shareData.quote}>
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton className="w-auto" url={shareData.url} title={shareData.text} hashtags={shareData.hashtags}>
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                       <WhatsappShareButton url={shareData.url} title={shareData.title} separator=":: ">
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

