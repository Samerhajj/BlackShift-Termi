import React,{useEffect,useState} from 'react';
import axios from 'axios';
import FavCard from './FavCard';
import fav from './fav.css';

import TermCard from '../../components/TermCard/TermCard';

// --> Import APIs
import UserAPI from '../../api/UserAPI';

const Favorite  = ({initialLanguage}) =>{
    console.log("hi from Favorite parent");
    const [list,setList] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const [language,setLanguage]=useState(initialLanguage);
    //--> functions
    const handle_showMore = async () => {
        const response = await UserAPI.favorites();
        if (response.success) {
          setList([...response.body]);
          setIsOpen(!isOpen);
        } else {
          alert(response.message);
        }
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Update the language of the FavCard components
    setList(list.map((card) => {
      return {
        ...card,
        initialLanguage: newLanguage
      };
    }));
  };

    return (
    <>
    <div className="banner banner_note">
        <div className="wrapper">
            <div className="banner_content fade-in-element">
                <h1><strong>Favorite</strong></h1>
            </div>
         </div>
    </div>
    <div className="wrapper">
        <button className="btn btn-primary mt-5" onClick={handle_showMore}>Show More</button>
        {(isOpen) ?
        (
            list.map((item,index)=>{
                {/*return(<FavCard key={index} index={index} data={item} list={list} setList={setList} initialLanguage={language} changeLanguage={changeLanguage}/>);*/}
                return(<TermCard key={index} initialLanguage="en" isFavorite={true} term={item} setParentList={setList}/>);
            }) 
        )
        : 
            (null)
        }
    </div>
    </>
)}
export default Favorite;
