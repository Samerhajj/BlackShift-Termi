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
    const termCardRef = useRef(null);
    const handleClick = () => {
        navigate('/suggest');
    };
    

    const search = async (term, lang, category) => {
        if(category !== undefined){
            setShowResult(false);
            
            if(term != ""){
                const res = await SearchApi.search(term, lang, category);
                console.log(res);
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
                    setResultLanguage(inputLanguage);
                    setShowResult(true);
                    setInputLanguage(i18n.language);
                    
                    setSearchParams({
                        term: term,
                        lang: lang,
                        category: category
                    });
                    console.log(searchParams)
                    
                    // if(closestResult.categoryId == category) 
                //     {
                //     setResultTerm({term: closestResult, isFav: favorite.includes(closestResult._id),category:category,categoryNames:categoryResult});
                //     setResultLanguage(inputLanguage);
                //     setShowResult(true);
                //     setInputLanguage(i18n.language);
                // } else {
                //     // show an error message or alert to the user that no terms were found in the selected category
                //     alert("No terms were found in the selected category, please try again with a different category.");
                // }

                }else{
                    //show modal, ask user if wants to add concept or not
                    setShow(true);
                }
            }
            
            setSearchedTerm("");
        }else{
    		alert("Must choose a category first");
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
            console.log(res);
            if(res.success){
                console.log(res.body);
                setSuggestions(res.body);
            }else{
                alert(res.message);
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
            alert("Must choose a category first");
        }
    };
    
    const selectAutoCompleteTerm = (term)=>{
        search(term, LanguageMap[inputLanguage].name, category);
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
    
    const handleSearchFocus = async () =>{
        if (searchedTerm.length === 0 && login) {
          // Make API call here
          console.log("API call made");
          const res = await SearchApi.historySearch();
          if(res.success){
                setSuggestions(res.body);
          }else{
                alert(res.message);
          }
        //   setSuggestions(res);
          console.log(res)
        }
    }

return(
    <>
        <div className="banner banner_home">
            <div className='wrapper'>
                <div className="banner_content fade-in-element">
                    <h1><span><strong>{t('search.title')}</strong></span><br/></h1>
                    <div className="search-box">
                        <input className="search-input" dir={i18n.dir(inputLanguage)} placeholder={t('search.search_placeholder')} value={searchedTerm} type="text" onKeyUp={(e) => handleEnterClick(e)} onChange={(e) => {updateInput(e.target.value)}} onFocus={handleSearchFocus}/>
                        <i className="fa fa-search search-button" onClick={()=>{search(searchedTerm, LanguageMap[inputLanguage].name, category)}}></i>
                        { suggestions.length != 0 ? 
                            <div className="autocomplete-box">
                                {
                                    suggestions.map((item,index) => {
                                        return(
                                            <div className="autocomplete-item" key={index} type="button" onClick={(e)=>selectAutoCompleteTerm(item)}>{item}</div>
                                        );
                                    })
                                }
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className="flex-container">
                        <div className="small-category-selector">
                            <CategorySelector category={category} categoryChanged={(newCategory) => {changeCategory(newCategory)}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {showResult ? (
            <div ref={termCardRef}>
              <TermCard
                role = {userData.role}
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
          <Modal.Body>If you would like to suggest a concept, please press Suggest Concept</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClick}>
              Suggest Concept
            </Button>
          </Modal.Footer>
        </Modal>
         
    </>
);
};

export default TermsPage;

{
//Extra:
// <div className="term-box" ref={definitionElement}>
//         <div className="categories-box">
//             <div className="category-tag">
//                 {definitions.category == "0" ? t('search.human_resources') : "Other Category"}
//             </div>
//             {/*<div class="star" id="star"/>*/}
//             <img className="star" src={stars_1} onClick = {handle_starsClick}/>
//         </div>
//         <div className="definitions-box">
//             <h3 className="trem-text">{definitions.term}</h3>
//               <Accordion className="my-3" defaultActiveKey="0">
//  <Accordion.Item eventKey="0">
//      <Accordion.Header>{t('search.short_definition')}</Accordion.Header>
//      <Accordion.Body>{definitions.shortDef}</Accordion.Body>
//  </Accordion.Item>
//      <Accordion.Item eventKey="1">
//          <Accordion.Header>{t('search.long_definition')}</Accordion.Header>
//          <Accordion.Body>{definitions.longDef}</Accordion.Body>
//      </Accordion.Item>
//  </Accordion>
//  <div>
//   <a className="read-url" href={definitions.readMore}>{t('search.read_more')}</a>
//                 <p className="suggestedby-text">{t('search.suggested_by')} {definitions.suggestedBy}</p>

//           {/*  <p className="short-definition-text">{definitions.shortDef}</p>
//             <p className="long-definition-text">{definitions.longDef}</p>
//             <div className="term-box-footer">*/}
               
//             </div>
//         </div>
//     </div>
//OLD TERM DEFINITION:
// <Card className="m-3 mb-3">
//     <Card.Header as="h5">{definitions.category == "0" ? t('search.human_resources') : "Other Category"}</Card.Header>
//     <Card.Body>
//         <blockquote className="blockquote mb-0">
//             <h3>{' '}{definitions.term}{' '}</h3>
//             <p className="blockquote-footer mt-2">
//                 {t('search.suggested_by')} <cite title="Suggested By">{definitions.suggestedBy}</cite>
//             </p>
//         </blockquote>
        
//         <Accordion className="my-3" defaultActiveKey="0">
//             <Accordion.Item eventKey="0">
//                 <Accordion.Header>{t('search.short_definition')}</Accordion.Header>
//                 <Accordion.Body>{definitions.shortDef}</Accordion.Body>
//             </Accordion.Item>
//             <Accordion.Item eventKey="1">
//                 <Accordion.Header>{t('search.long_definition')}</Accordion.Header>
//                 <Accordion.Body>{definitions.longDef}</Accordion.Body>
//             </Accordion.Item>
//         </Accordion>
        
//         <a href={definitions.readMore}>{t('search.read_more')}</a>
//     </Card.Body>
// </Card>

// OLD SEARCH BAR:
// <h1><span><strong>{t('search.title')}</strong></span><br/></h1>
// <div className="flex d-flex">
//     <input dir={i18n.dir(inputLanguage)} className="form-control" placeholder={t('search.search_placeholder')} value={searchedTerm} type="text" onChange={(e) => {updateInput(e.target.value)}}/>
//     <button className="btn btn-primary w-auto" onClick={()=>{search()}}><i className="fa fa-search"></i></button>
// </div>
// <div className="list-group mt-2">
//     {
//         suggestions.map((item,index) => {
//             return(
//                 <button key={index} type="button" onClick={(e)=>selectAutoCompleteTerm(item)} className="list-group-item list-group-item-action">{item}</button>
//             );
//         })
//     }
// </div>


// <Row md={2} xs={12} dir="ltr" className="mt-3 d-flex justify-content-center">
//     <Col>
//         <InputGroup>
//             <input dir={i18n.dir(inputLanguage)} className="form-control" placeholder={t('search.search_placeholder')} value={searchedTerm} type="text" onChange={(e) => {updateInput(e.target.value)}}/>
//             <button className="btn btn-primary" onClick={()=>{search()}}><i className="fa fa-search"></i></button>
//         </InputGroup>
//         <div className="list-group mt-2">
//             {
//                 suggestions.map((item,index) => {
//                     return(
//                         <button key={index} type="button" onClick={(e)=>selectAutoCompleteTerm(item)} className="list-group-item list-group-item-action">{item}</button>
//                     );
//                 })
//             }
//         </div>
//     </Col>
// </Row>



// <Row className="mt-5 text-center">
//     <h1 className={styles.title}>Termi</h1>
// </Row>
// <Row md={2} xs={12} dir="ltr" className="mt-3 d-flex justify-content-center">
//     <Col>
//         <InputGroup>
//             <input dir={i18n.dir(i18n.language)} className="form-control" placeholder={t('search.search_placeholder')} value={searchedTerm} type="text" onChange={(e) => {setSearchedTerm(e.target.value)}}/>
//             <button className="btn btn-primary" onClick={()=>{search()}}><i className="fa fa-search"></i></button>
//         </InputGroup>
//         <div className="list-group mt-2">
//             {
//                 suggestions.map((item,index) => {
//                     return(
//                         <button key={index} type="button" onClick={(e)=>selectAutoCompleteTerm(item)} className="list-group-item list-group-item-action">{item}</button>
//                     );
//                 })
//             }
//         </div>
//     </Col>
// </Row>


// <Row className="mt-3">
//             <Col lg={3} xs={0}/>
//             <Col lg={4} xs={10}>
//                 <input placeholder={t('search.search_placeholder')} value={searchedTerm} className="form-control" type="text" onChange={(e) => {setSearchedTerm(e.target.value)}}/>
//                 <div className="list-group">
//                     {
//                         suggestions.map((item,index) => {
//                             return(
//                                 <button key={index} type="button" onClick={(e)=>selectAutoCompleteTerm(item)} className="list-group-item list-group-item-action">{item}</button>
//                             );
//                         })
//                     }
//                 </div>
//             </Col>
//             <Col lg={2} xs={2}>
//                 <Button className="btn btn-primary" size="s" onClick={search}><i className="fa fa-search"></i></Button>
//             </Col>
//             <Col lg={3} xs={0}/>
//         </Row>


// Different Styles:
// ---------------

// <div className="d-flex justify-center">
//     <div className={styles.searchbar}>
//         <input placeholder={t('search.search_placeholder')} value={searchedTerm} className={styles.search_input} type="text" onChange={(e) => {setSearchedTerm(e.target.value)}}/>
//         <a href="#" className={styles.search_icon}><i className="fa fa-search" onClick={search}></i></a>
//     </div>
// </div>
// ---------------
}