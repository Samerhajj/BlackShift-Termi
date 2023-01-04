import React,{useState} from 'react';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
// --> components
import SuggestCard from './SuggestCard';

import './Admin.css'

// <IconBell />

const AdminPage=()=> {
    const navigate=useNavigate();
    const {t} = useTranslation();
  const handleSuggestionPage = () => {
    navigate('/admin/suggestions');
  };
   const handleAddTerms = () => {
    navigate('/admin/add-term');
  };
return (
    <div>
    <div className="banner banner_profile">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="pulsing-element">
              <strong>Welcome Admin User...</strong>
            </h1>
          </div>
        </div>
      </div>
            <div className="container d-flex justify-content-center">
                <div className="admin-body">
                    <p className="par">Start You Control</p>
                    <button className=" su-button mb-2" onClick={
                    handleSuggestionPage}>
                    Suggestions from users</button>
                    <button className="su-button mb-2" onClick={
                    handleAddTerms}>Admin Add Terms</button>
                    <button className="su-button mb-2" onClick={
                    ()=> navigate('/about')}
                    >About Page</button>
                    <button className="su-button mb-2" onClick={
                    ()=> navigate('/')}
                    >Find Term Page</button>
                    <button className="su-button mb-2" onClick={
                    ()=> navigate('/note')}
                    >Admin Note</button>
                    <button className="su-button mb-2" onClick={
                    ()=> navigate('/profile')}
                    >Profile Page</button>
                    <button className="su-button mb-2" onClick={
                    ()=> navigate('/games')}
                    >{t('Adminwords.Games')}</button>
                </div>
            <div>
        </div>
    </div>
</div>
    )
}


export default AdminPage;