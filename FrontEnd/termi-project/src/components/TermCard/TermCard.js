import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import LanguageMap from "../../api/LanguageAPI";
import style from "./TermCard.css";
import Image from 'react-bootstrap/Image';

// --> APIs
import UserApi from '../../api/UserAPI';

// --> Import Icons
import {BsStarFill, BsStar} from 'react-icons/bs';

const TermCard = (props) =>{
    const { t } = useTranslation();
    const [language, setLanguage] = useState(props.initialLanguage);
    const [isFav, setIsFav] = useState(props.isFavorite);
    
    const handle_starsClick = async() =>{
        if(!isFav){
            const res = await UserApi.addFavorite(props.term._id);
            if(res.success){
                if(props.setParentList){
                    props.setParentList([...res.body.updatedList]);
                }else{
                    setIsFav(res.body.isAdded);
                }
            }else{
                alert(res.message);
            }
        }else{
            const res = await UserApi.deleteFavorite(props.term._id);
            if(res.success){
                if(props.setParentList){
                    props.setParentList([...res.body.updatedList]);
                }else{
                    setIsFav(!res.body.isDeleted);
                }
            }else{
                alert(res.message);
            }
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
                    {
                        localStorage.getItem("login") === 'true' ? (
                            isFav ? (
                                <BsStarFill className="star-filled" onClick={()=>{handle_starsClick();}}/>
                            ):(
                                <BsStar className="star-outline" onClick={()=>{handle_starsClick();}}/>
                            )
                        ) : (null)
                    }
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