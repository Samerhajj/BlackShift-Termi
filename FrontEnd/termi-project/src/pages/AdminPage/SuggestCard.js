import React, { useState } from 'react';
import axios from "axios";
import { Input,Select, Button } from 'antd';
import AdminAPI from '../../api/AdminAPI';
import {Form, Modal} from "react-bootstrap";
import EditModal from './EditCard/EditModal.js';
import PropTypes from 'prop-types';
import LanguageMap from '../../api/LanguageAPI';
import './Admin.css'
import {Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// --> import Icons

import { IconContext } from "react-icons";
import {AiTwotoneEdit,AiFillDelete} from 'react-icons/ai';

const SuggestCard = ({ data,setSuggestList,suggestList,initialLanguage }) => {
    const [currentLanguage, setLanguage] = useState(initialLanguage);
    const navigate = useNavigate();

  
  const handleDelete = async () =>{
      const response = await AdminAPI.deleteSelectedTerm(data);
      if(response.success){
        console.log(response);
        setSuggestList(suggestList.filter((item) => item['_id'] !== response.body.del_ID));
        // setSuggestList([...response.body])
     }
     else{
       alert(response.message);
     }
  }
  
  const handleApprove=async()=>{
    const id = data._id;
    console.log(id);
    console.log(data);
    // const response = await AdminAPI.addSelectedTerm(data);
    // if(response.success){
    //   console.log(response);
    //   const response = await AdminAPI.deleteSelectedTerm(data);
    //   setSuggestList(suggestList.filter((item) => item['_id']!==id));

    }
    // else{
    //   alert(response.message);
    //}
 // }
  
  const handleEdit=()=>{
    navigate("/admin/add-term", {
        state: {
          termSuggestedByID:data.termSuggestedByID,
          _id: data._id,
          selectedCategory: data.categories ? data.categories[0]: undefined,
          conceptName:{
            english: data.conceptName ? data.conceptName.english: undefined,
            arabic: data.conceptName ? data.conceptName.arabic: undefined,
            hebrew: data.conceptName ? data.conceptName.hebrew: undefined,
          },
          shortDefinition:{
            english: data.shortDefinition ? data.shortDefinition.english: undefined,
            arabic: data.shortDefinition ? data.shortDefinition.arabic: undefined,
            hebrew: data.shortDefinition ? data.shortDefinition.hebrew: undefined,
          },
          longDefinition:{
            english: data.longDefinition ? data.longDefinition.english: undefined,
            arabic: data.longDefinition ? data.longDefinition.arabic: undefined,
            hebrew: data.longDefinition ? data.longDefinition.hebrew: undefined,
          },
          suggestedBy: data.suggestedBy,
          readMe: data.readMore
        }
    });
  };
  

  const changeLanguage = (newLanguage) => { 
    console.log("hi from Change Language");
  setLanguage(newLanguage);
};


  return (

    
    <div className="oneCard-e p-4">
     <div className="language-selector">
                         {
                Object.keys(LanguageMap).map((language) => (
                  <div className="m-0 p-2 language-btn" key={language} onClick={() => {changeLanguage(language)}}>
                    <Image className="img-fluid" src={LanguageMap[language].src} />
                  </div>
                ))
              }
              </div>
      <div className="d-flex justify-content-around mt-3">
      
              <span className="edit-icon" onClick={()=>{handleEdit()}}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                      <AiTwotoneEdit/>
                  </IconContext.Provider>
              </span>
              
               {data.conceptName &&(
                  <h1 className="suggest-card__title font-weight-bold">{data.conceptName[LanguageMap[currentLanguage].name]}</h1>
                  )
               }
              <span>
                  <IconContext.Provider value={{ size: "2rem" }}>
                      <AiFillDelete onClick={handleDelete}/>
                  </IconContext.Provider>
              </span>
             
      </div>
      
      {data.shortDefinition && (
          <div className="definition">
            <p className="definition__text">{data.shortDefinition[LanguageMap[currentLanguage].name]}</p>
          </div>
        )}
      <h6 className="suggest-card__subtitle">suggestedBy : {data['suggestedBy']}</h6>
    {/*  <button className="btn" onClick={handleApprove}>Approve to database</button>*/}
    </div>
    
  );
};

SuggestCard.propTypes = {
  suggestList: PropTypes.array,
  data: PropTypes.object,
  setList: PropTypes.func
};

export default SuggestCard;

