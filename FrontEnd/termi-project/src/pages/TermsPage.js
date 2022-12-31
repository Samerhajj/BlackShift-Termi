import React,{useState, useEffect,useRef} from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from 'react-i18next';
import 'font-awesome/css/font-awesome.min.css';
import styles from '../styles/TermsPage.css';
import SearchApi from '../api/SearchAPI';
import { Modal, Button } from "react-bootstrap";
import LanguageMap from '../api/LanguageAPI';
import TermCard from '../components/TermCard/TermCard';
import { useNavigate} from 'react-router-dom';

const TermsPage = () =>{
    const { t, i18n } = useTranslation();
    const [searchedTerm, setSearchedTerm] = useState("");
    const [category, setCategory] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [inputLanguage, setInputLanguage] = useState(i18n.language);
    const navigate = useNavigate();
    const [resultTerm, setResultTerm] = useState({});
    const [resultLanguage, setResultLanguage] = useState(i18n.language);
    const [showResult, setShowResult] = useState(false);
    
    /*Adding Modal to redirect user to concept add page
    */
    const[show,setShow]=useState(false);
    const handleClose=()=>setShow(false);
    
    const handleClick = () => {
    navigate('/suggest');
    };
    
    const search = async (term) => {
        setShowResult(false);
        if(term != ""){
            const res = await SearchApi.search(term, category);
            if(res.success){
                let closestResult = res.body;
                console.log(closestResult._id);
                //let favorite = JSON.parse(localStorage.getItem("profileBody"))['favorite'];
                let favorite=[];
               if (localStorage.getItem("profileBody") !== null) {
                     favorite = JSON.parse(localStorage.getItem("profileBody"))['favorite'];
                  }
                setResultTerm({term: closestResult, isFav: favorite.includes(closestResult._id)});
                setResultLanguage(inputLanguage);
                setShowResult(true);
                setInputLanguage(i18n.language);
            }else{
                //show modal, ask user if wants to add concept or not
                setShow(true);
            }
            {
           
            }
        }
        setSearchedTerm("");
    };
    
    const autoComplete = async () => {
        let input = searchedTerm;
        const res = await SearchApi.autocomplete(input, LanguageMap[inputLanguage].name);
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
        
    };
    
    const selectAutoCompleteTerm = (term)=>{
        // setSearchedTerm(term);
        search(term);
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
            search(searchedTerm);
        }
    };
    
    useEffect(() => {
        let timeout = 0;
        if(searchedTerm.length < 1){
            setSuggestions([]);
        }else{
            timeout = setTimeout(() => {
                autoComplete();
            }, 400);
        }
        return () => {
            clearTimeout(timeout);
        };
    },[searchedTerm]);
    
    // Listen to change language and act accordingly
    useEffect(()=>{
        setInputLanguage(i18n.language);
    },[i18n.language]);
  
    return(
        <>
            <div className="banner banner_home">
                <div className='wrapper'>
                    <div className="banner_content fade-in-element">
                        <h1><span><strong>{t('search.title')}</strong></span><br/></h1>
                        <div className="search-box">
                            <input className="search-input" dir={i18n.dir(inputLanguage)} placeholder={t('search.search_placeholder')} value={searchedTerm} type="text" onKeyUp={(e) => handleEnterClick(e)} onChange={(e) => {updateInput(e.target.value)}}/>
                            <i className="fa fa-search search-button" onClick={()=>{search(searchedTerm)}}></i>
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
                    </div>
                </div>
            </div>
            { showResult ? 
                <TermCard term={resultTerm.term} isFavorite={resultTerm.isFav} initialLanguage={resultLanguage}/>
                :
                null
            }
            
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

// <div class="list-group">
//   <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
//     The current button
//   </button>
//   <button type="button" class="list-group-item list-group-item-action">A second item</button>
//   <button type="button" class="list-group-item list-group-item-action">A third button item</button>
//   <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
//   <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
// </div>



//  <ul className="list-group">
//                     {
//                         list.map((item,index) => {
//                             return(
//                             <li key={index} className="list-group-item">{item}</li>
//                             )
//                         })
//                     }
//                     </ul>







//  <>
//         <div className=" d-flex justify-content-center">
//             <div>
//                 <h4>Terms Page</h4>    
//                   <input type="text" onChange={(e)=> autoComplete(e)}/>
//                 <Button className="btn btn-primary" size="s" onClick={search}>Send</Button>

//             </div>
//             <div className="mt-5">
//                 <h2> Definition : {definition}</h2>
//             </div>
//         </div>
//         </>
}