import React,{useState, useEffect,useRef,useContext} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'font-awesome/css/font-awesome.min.css';
import styles from '../styles/TermsPage.css';
import SearchApi from '../api/SearchAPI';
import { Modal, Button } from "react-bootstrap";
import LanguageMap from '../api/LanguageAPI';
import TermCard from '../components/TermCard/TermCard';
import { useNavigate} from 'react-router-dom';
import CategorySelector from "../components/CategorySelector";
import {LoginContext} from "../components/LoginContext";
import {Image} from 'react-bootstrap'
import NewImg from '../assets/images/Icons/New.png';
import TrendingImg from '../assets/images/Icons/Trending.png';
import NotificationsAPI from '../api/NotificationsAPI'
import { FaMicrophone } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { AiOutlineHistory } from 'react-icons/ai';
import { franc } from 'franc';


const TermsPage = () =>{
    const [searchParams, setSearchParams] = useSearchParams();
    const { t, i18n } = useTranslation();
    const {login, userData, setUserData } = useContext(LoginContext);
    const [searchedTerm, setSearchedTerm] = useState("");
    const [category, setCategory] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const [inputLanguage, setInputLanguage] = useState(i18n.language);
    const navigate = useNavigate();
    const [resultTerm, setResultTerm] = useState({});
    const [resultLanguage, setResultLanguage] = useState(i18n.language);
    const [showResult, setShowResult] = useState(false);
    const [show,setShow]=useState(false);
    const handleClose=()=>setShow(false);
    const [listening, setListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const termCardRef = useRef(null);
    const handleClick = () => {
        navigate('/suggest');
    };
    
  const handleGPT = () => {
        navigate('/gpt');
    };
    const search = async (term, lang, category) => {
        if(category !== undefined){
            setShowResult(false);
           
            if(term != ""){
                const res = await SearchApi.search(term, lang, category);
                if(res.success){
                    // MUST REMOVE
                    var attempts = (parseInt(localStorage.getItem('searchCounter'))+1);
                    localStorage.setItem("searchCounter",attempts );
			              setUserData({...userData, searchCounter: userData.searchCounter + 1});
                    let closestResult = res.body['closestResult'];
                    closestResult = Object.assign({}, closestResult, { category });
                    let categoryResult = res.body['categoryNames'];
                    let favorite=[];
                    
                    if (login && userData.favorite) {
                        favorite = userData.favorite;
                    }
                    setResultTerm({term: closestResult, isFav: favorite.includes(closestResult._id),categoryNames:categoryResult});
                    setResultLanguage(checkInputLang(term));
                    setShowResult(true);
                    setInputLanguage(i18n.language);
                    
                    setSearchParams({
                        term: term,
                        lang: lang,
                        category: category
                    });
                }else{
                    //show modal, ask user if wants to add concept or not
                    setShow(true);
                }
            }
            
            setSearchedTerm("");
        }else{
    		NotificationsAPI.errorNotification("Must choose a category first");
    	}
    };
    
	const changeCategory = (newCategory) => {
		setCategory(newCategory);
	};
	
    const autoComplete = async () => {
        if(category !== undefined)
        {
            setShowResult(false);
            let input = searchedTerm;
            const res = await SearchApi.autocomplete(input, LanguageMap[inputLanguage].name,category);
            if(res.success){
                setSuggestions(res.body);
            }else{
                NotificationsAPI.errorNotification(res.message);
            }
        {
        // if the length of the text less than 3 no need to see any result
        // if(input.length < 1){
        //     setSuggestions([]);
        // }else{
        //     SearchApi.autocomplete("");
        //     let temp = [];
        //     const res = await axios.post(autocompleteAPI, {term: input});
        //     console.log(res.data);
        //     res.data.forEach((item)=>{
        //         temp.push(item.conceptName[languages[inputLanguage]]);
        //     });
        //   setSuggestions(temp);
        // }
        }
        }
        else if( handleEnterClick(true)){
            NotificationsAPI.errorNotification("Must choose a category first");
        }
    };
    
    const selectAutoCompleteTerm = (term)=>{
        setSuggestions([]);
        search(term, LanguageMap[checkInputLang(term)].name, category);
    };
    
    const checkInputLang = (s)=>{
        var hebrewChars = '\u05B0-\u05F4',
            arabicChars = '\u060C-\u06D2',
            isArabicChar = new RegExp('['+arabicChars+']+'),
            isHebrewChar = new RegExp('['+hebrewChars+']+');
        if(isArabicChar.test(s)){
            return "ar";
        }else if(isHebrewChar.test(s)){
            return "he";
        }else{
            return "en";
        }
    };

    const updateInput = (input)=>{
        if(input.trim().length != 0){
            let lang = checkInputLang(input);
            if(inputLanguage != lang){
                setInputLanguage(lang);
            }
        }else{
            setInputLanguage(i18n.language);
        }
        setSearchedTerm(input);
    };
    
    const handleEnterClick = (event) => {
        if(event.code == "Enter"){
            search(searchedTerm, LanguageMap[inputLanguage].name, category);
        }
    };

    useEffect(() => {
        let timeout = 0;
        if(searchedTerm.length < 1){
            setSuggestions([]);
        }else{
            timeout = setTimeout(() => {
                autoComplete();
            }, 400);// here we will call the autoComplete() after 400ms
        }
        return () => {
            clearTimeout(timeout);
        };
    },[searchedTerm]);
    
    // Listen to change language and act accordingly
    useEffect(()=>{
        setSuggestions([]);
        setSearchedTerm("");
        setInputLanguage(i18n.language);
    },[i18n.language]);
    
    useEffect(() => {
       if(userData.field == undefined){
           setCategory(0);
       }else{
           setCategory(userData.field);
       }
    }, [userData.field]);
    
    useEffect(() => {
        let term = searchParams.get("term");
        let lang = searchParams.get("lang");
        let category = searchParams.get("category");
        if(term && lang && category){
            search(term, lang, category);
        }
    }, []);
    
    useEffect(() => {
        if (showResult && termCardRef.current) {                    
            termCardRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [showResult]);
    
  const initializeRecognition = (category,language) => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition;
    console.log(category);

    if (SpeechRecognition) {
      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = false;
      newRecognition.interimResults = false;
      console.log(language);
      switch (language) {
  case 'english':
    newRecognition.lang = 'en-US'; // Specify English language with US accent
    break;
  case 'hebrew':
    newRecognition.lang = 'he-IL'; // Specify Hebrew language with Israel accent
    break;
  case 'arabic':
    newRecognition.lang = 'ar-SA'; // Specify Arabic language with Saudi Arabia accent
    break;
  default:
    newRecognition.lang = 'en-US'; // Set a default language if none matches
    break;
}
     


    const supportedLanguages = newRecognition.lang.split(','); // Get the list of supported languages

    console.log('Supported Languages:', supportedLanguages)
      newRecognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        const cleanedTranscript = transcript.replace(/[.\s]+$/, ''); // Remove dot and trailing whitespace
       setSearchedTerm(cleanedTranscript);
       
    
        setListening(false);
      };

      newRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setRecognition(null);
        setListening(false);
      };

      return newRecognition;
    } else {
      console.error('Speech recognition not supported in this browser.');
      return null;
    }
  };

  useEffect(() => {
    const recognition = initializeRecognition(category,LanguageMap[i18n.language].name);
    console.log(LanguageMap[i18n.language].name);
   setRecognition(recognition);
    return () => {
      if (recognition) {
        recognition.stop();
        setListening(false);
      }
    };
  }, [category,i18n.language]);



const handleStartListening = () => {
  if (!listening) {
    setSearchedTerm('');
    setListening(true);
    if (recognition) {
      recognition.start();
    } else {
      const newRecognition = initializeRecognition(category, LanguageMap[i18n.language].name);
      if (newRecognition) {
        setRecognition(newRecognition);
        newRecognition.start();
      } else {
        console.error('Speech recognition is not supported in this browser.');
      }
    }
  } else {
    console.error('Speech recognition is already active.');
  }
};



    
    const handleSearchFocus = async (e) =>{
        console.log(e);
        
        if (searchedTerm.length === 0 && login && (!e.target || !e.target.classList.contains("autocomplete-item"))) {
          // Make API call here
          console.log("In Search History")
          const res = await SearchApi.historySearch();
          if(res.success){
                setSuggestions(res.body);
          }else{
                NotificationsAPI.errorNotification("Unable to retrieve recent searches");
          }
        //   setSuggestions(res);
          console.log(res);
        }
    };

return (
  <>
    <div className="banner banner_home">
      <div className="wrapper">
        <div className="banner_content fade-in-element">
          {/*<h1><span><strong>{t('search.title')}</strong></span><br/></h1>*/}
          <div
            className="search-box"
            dir={i18n.dir(inputLanguage)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setSuggestions([]);
              }
            }}
            onFocus={(e) => handleSearchFocus(e)}
          >
            <input
              id="id_search_termi_page"
              className="search-input"
              placeholder={t('search.search_placeholder')}
              value={searchedTerm}
              type="text"
              onKeyUp={(e) => handleEnterClick(e)}
              onChange={(e) => {
                updateInput(e.target.value);
              }}
            />
            <i
              className="microphone-button fa"
              onClick={() => handleStartListening()}
              disabled={listening}
            >
              <FaMicrophone />
            </i>

            <i id="id_search_bar_button"
              className="fa fa-search search-button"
              onClick={() => {
                search(searchedTerm, LanguageMap[inputLanguage].name, category);
              }}
            ></i>
            {suggestions.length !== 0 ? (
              <div className="autocomplete-box">
                {suggestions.map((item, index) => {
                  return (
                    <div
                      tabIndex="0"
                      className="autocomplete-item d-flex flex-wrap align-items-center gap-3 justify-content-center"
                      key={index}
                      type="button"
                      onClick={(e) => selectAutoCompleteTerm(item.conceptName)}
                    >
                      <div>{item.conceptName}</div>
                      <div>
                        {item.isTrending ? (
                          <Image style={{ width: '35px' }} src={TrendingImg} />
                        ) : null}
                        {item.isNew ? (
                          <Image style={{ width: '50px' }} src={NewImg} />
                        ) : null}
                        {item.isHistory ? (
                          <IconContext.Provider value={{ size: '1.5rem' }}>
                            <AiOutlineHistory />
                          </IconContext.Provider>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="flex-container">
            <div className="small-category-selector">
              <CategorySelector
                category={category}
                categoryChanged={(newCategory) => {
                  changeCategory(newCategory);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {showResult ? (
      <div ref={termCardRef}>
        <TermCard
          role={userData.role}
          categories={resultTerm.categoryNames}
          term={resultTerm.term}
          isSearch={true}
          isFavorite={resultTerm.isFav}
          initialLanguage={resultLanguage}
        />
      </div>
    ) : null}

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Concept</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        If you would like to suggest a concept, please press Suggest Concept
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Suggest Concept
        </Button>
        <Button variant="info"  onClick={handleGPT}>
        ChatGPT
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

};

export default TermsPage;

