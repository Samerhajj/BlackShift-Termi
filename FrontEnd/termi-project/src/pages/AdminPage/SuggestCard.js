import React, { useState } from 'react';
import axios from "axios";
import { Input,Select, Button } from 'antd';
import AdminAPI from '../../api/AdminAPI';
import {Form, Modal} from "react-bootstrap";
import EditModal from './EditCard/EditModal.js'
import PropTypes from 'prop-types'
import './Admin.css'

// --> import Icons
import { IconContext } from "react-icons";
import {AiTwotoneEdit,AiFillDelete} from 'react-icons/ai';

const SuggestCard = ({ data,setSuggestList,suggestList }) => {
  const languages = ['english', 'arabic', 'hebrew'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  
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
  }
  
  const handleApprove=async()=>{
    const id = data._id;
    console.log(id);
    // const response = await AdminAPI.addSelectedTerm({_id:id});//data
    const response = await AdminAPI.addSelectedTerm(data);
    if(response.success){
      console.log(response);
      const response = await AdminAPI.deleteSelectedTerm(data);
      setSuggestList(suggestList.filter((item) => item['_id']!==id));

    }
    else{
      alert(response.message);
    }
  }
  
// const handleApprove = async()=>{
  
//   const respone = await.AdminAPI.addSelecterTerm()
// }

  const currentLanguage = languages[currentIndex];


  return (
    
    <div className="oneCard-e p-4">
    
      <div className="d-flex justify-content-around mt-3">
              <span className="edit-icon" onClick={handleShow}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                      <AiTwotoneEdit/>
                  </IconContext.Provider>
              </span>
                  <h1 className="suggest-card__title font-weight-bold">{data.conceptName[currentLanguage]}</h1>
              <span>
                  <IconContext.Provider value={{ size: "2rem" }}>
                      <AiFillDelete onClick={handleDelete}/>
                  </IconContext.Provider>
              </span>
      </div>
      
      {
        data.shortDefinition && (
          <div className="definition">
            <p className="definition__text">{data.shortDefinition[currentLanguage]}</p>
          </div>
        )
      }
      
      {/*
      {
        data.longDefinition && (
          <div className="definition">
            <p className="definition__text">{data.longDefinition[currentLanguage]}</p>
          </div>
        )
      }
      */}
      {/*
      {
       data.lastEditedDisplayable && (
    <div className="last-edited">
      <h1 style={{fontStyle: 'italic', fontWeight: 'bold'}} className="last-edited__text">Last edited: {data.lastEditedDisplayable}</h1>
    </div>
    )
    }
    */}
      <h6 className="suggest-card__subtitle">suggestedBy : {data['suggestedBy']}</h6>
      <button className="btn btn-danger" onClick={handleNextSlide}>Next</button>
      <button className="btn btn-success" onClick={handlePrevSlide}>Prev</button>
      
      <button className="btn" onClick={handleEditCard}>send to edit</button>
        <button className="btn" onClick={handleApprove}>Approve to database</button>
      
      {(show)&&(<EditModal show={show} setShow={setShow} />)}
    </div>
  );
  
  function handleShow () {
    setShow(true)
  };
  function handleEditCard() {
    console.log("handleEditCard")
    // not implemented
  }
}

SuggestCard.propTypes = {
  suggestList: PropTypes.array,
  data: PropTypes.object,
  setList: PropTypes.func
}

export default SuggestCard;

