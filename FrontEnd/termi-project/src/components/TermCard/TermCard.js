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

//
import PropTypes from 'prop-types';


const TermCard = (props) =>{
    const { t } = useTranslation();
    const [language, setLanguage] = useState(props.initialLanguage);
    const [isFav, setIsFav] = useState(props.isFavorite);
    const [isSearch,setIsSearch] = useState(props.isSearch);

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
                    {/*
                        props.term.categories.map((category, index) =>{
                            return(
                                <div key={index} className="category-tag">
                                    {category}
                                </div>
                            );
                        })
                    */}
                    
                    
                    {
                    (isSearch)  &&
                        props.categorys.data.map((item, index)=>{
                            return(<div key={index} className="category-tag">{item[LanguageMap[language].name]}</div>);
                        })
                    }
                    
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
                <div className="search-count">Searched {props.term.searchCount} times</div>
                    <h3 className="trem-text" dir={LanguageMap[language].dir}>{props.term.conceptName[LanguageMap[language].name]}</h3>
                    <Accordion className="my-3" defaultActiveKey="0">
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
                </div>
            </div>
        </div>
    );
};

//   initialLanguage: ,need to be added
TermCard.propTypes = {
  isFavorite: PropTypes.bool,
  term: PropTypes.object,
  searchCount: PropTypes.number.isRequired
}


export default TermCard;


                    // {
                    //     props.categorys.map((item)=>{
                    //         return(
                    //         <h1>nigga</h1>
                    //         );
                    //     })
                    // }