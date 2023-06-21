import React,{useEffect, useState, useContext} from 'react';
import fav from './fav.css';

import TermCard from '../../components/TermCard/TermCard';
import { useTranslation } from 'react-i18next';
// --> Import APIs
import UserAPI from '../../api/UserAPI';
import NotificationsAPI from '../../api/NotificationsAPI';

// --> Contexts
import { LoginContext } from "../../components/LoginContext";

const Favorite  = ({initialLanguage}) =>{
    const { i18n, t } = useTranslation();
    const { userData } = useContext(LoginContext);
    const [list,setList] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const [language,setLanguage]=useState(initialLanguage);
    
    //--> functions
    const handle_showMore = async () => {
        const response = await UserAPI.favorites(userData.email);
        if (response.success) {
            console.log("OUT:::");
            console.log(response.body);
            setList([...response.body]);
            setIsOpen(!isOpen);
        } else {
          NotificationsAPI.errorNotification(response.message);
        }
    };
    
    useEffect(()=>{
      handle_showMore();
    },[]);

    return (
    <>
    <div className="banner banner_note">
        <div className="wrapper">
            <div className="banner_content fade-in-element">
                <h1><strong>{t('favorite.favtitle')}</strong></h1>
            </div>
         </div>
    </div>
    <div className="wrapper">
        {(isOpen) ?
        (
            list.map((item,index)=>{
                {/*return(<FavCard key={index} index={index} data={item} list={list} setList={setList} initialLanguage={language} changeLanguage={changeLanguage}/>);*/}
                return(<TermCard key={index} initialLanguage="en" isFavorite={true} term={item} setParentList={setList} categories={item.categories}/>);
            }) 
        )
        : 
            (null)
        }
    </div>
    </>
)}
export default Favorite;
