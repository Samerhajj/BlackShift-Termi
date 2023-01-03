import React, { useState } from 'react';
import axios from "axios";
import { Form, Input,Select, Button } from 'antd';
import AdminAPI from '../../api/AdminAPI';

import PropTypes from 'prop-types'
import './Admin.css'



const SuggestCard = ({ data,setSuggestList,suggestList }) => {
  const languages = ['english', 'arabic', 'hebrew'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    else{
      setCurrentIndex(languages.length-1);
    }
  }

  const handleNextSlide = () => {
    if (currentIndex < languages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    else{
    setCurrentIndex(0);
    }
  }
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

       
       
       
       
       
    // const res = await axios.delete("http://dir.y2022.kinneret.cc:7013/user/deleteonesuggest"
    // , {data : {
    //       suggestId: data['_id']
    // }})
    
    // console.log(data);
    
    

  }
  
  
  // axios.delete('/deleteonesuggest', {
  // data: {
  //   suggestId: 'abc123'
  // }

  const currentLanguage = languages[currentIndex];

  return (
    <div className="oneCard-e">
      <h1 className="suggest-card__title">{data.conceptName[currentLanguage]}</h1>
      {
        data.shortDefinition && (
          <div className="definition">
            <p className="definition__text">{data.shortDefinition[currentLanguage]}</p>
          </div>
        )
      }
      {
        data.longDefinition && (
          <div className="definition">
            <p className="definition__text">{data.longDefinition[currentLanguage]}</p>
          </div>
        )
      }
      {
       data.lastEditedDisplayable && (
    <div className="last-edited">
      <h1 style={{fontStyle: 'italic', fontWeight: 'bold'}} className="last-edited__text">Last edited: {data.lastEditedDisplayable}</h1>
    </div>
    )
    }
      <h2 className="suggest-card__subtitle">suggestedBy : {data['suggestedBy']}</h2>
      <button className="btn btn-success" onClick={handlePrevSlide}>Prev</button>
      <button className="btn btn-danger" onClick={handleNextSlide}>Next</button>
      
      
      <button onClick={handleDelete}>Delete</button>
      
    </div>
  );
}

SuggestCard.propTypes ={
  suggestList: PropTypes.array,
  data: PropTypes.object,
  setList: PropTypes.func
}

export default SuggestCard;

