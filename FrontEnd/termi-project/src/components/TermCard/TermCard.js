import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import stars_1 from "../../images/stars_1.png";
import axios from "axios";
import LanguageMap from "../../api/LanguageAPI";
import style from "./TermCard.css";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

// --> Import Icons
import {BsStarFill, BsStar} from 'react-icons/bs';

const TermCard = (props) =>{
    const { t } = useTranslation();
    const [language, setLanguage] = useState(props.initialLanguage);
    const handle_starsClick = async() =>{
        try{
            let emailA = JSON.parse(localStorage.getItem("profileBody"))['email'];
            let personId = JSON.parse(localStorage.getItem("profileBody"))['_id'];
            const update = await axios.put("http://dir.y2022.kinneret.cc:7013/search/send-favorite", {id:props.term._id,email:emailA,person_id:personId});
            console.log(update);
            if(update.data){console.log("true")}
            else {console.log("false")}
        }
        catch(err){
            console.log("hi from err");
            console.log(err);
        }
    };
    
    
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };
    
    return(
        <div className="term-card" dir="ltr">
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
                <div className="categories-box">
                    { 
                        props.term.categories.map((category, index) =>{
                            return(
                                <div key={index} className="category-tag">
                                    {category}
                                </div>
                            );
                        })
                    }
                    {/*<img className="star" src={stars_1} onClick={handle_starsClick}/>*/}
                    <BsStar className="star" onClick={()=>{handle_starsClick();}}/>
                </div>
                <div className="definitions-box">
                    <h3 className="trem-text" dir={LanguageMap[language].dir}>{props.term.conceptName[LanguageMap[language].name]}</h3>
                    <Accordion className="my-3" defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{t('.')}</Accordion.Header>
                           
                            <Accordion.Body dir={LanguageMap[language].dir}>{props.term.shortDefinition[LanguageMap[language].name]}</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>{t('...')}</Accordion.Header>
                            <Accordion.Body dir={LanguageMap[language].dir}>{props.term.longDefinition[LanguageMap[language].name]}</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                <div>
                    <a className="read-url" href={props.term.readMore}>{t('search.read_more')}</a>
                        <p className="suggestedby-text">{t('search.suggested_by')} {props.term.suggestedBy}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermCard;