import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
// --> components
import './Admin.css'

// <IconBell />

const AdminPage=()=> {
  const navigate=useNavigate();
  const {t} = useTranslation();

return (
    <div>
    <div className="banner banner_admin">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="pulsing-element">
              <strong className="text-white">Welcome Admin User...</strong>
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
                    <button className=" su-button mb-2" onClick={
                    top10}>
                    Top 10</button>
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
    
function top10(){
    navigate('/admin/top-10');
}
function handleAddTerms(){
    navigate('/admin/add-term');
};
function handleSuggestionPage(){
    navigate('/admin/suggestions');
};
  
}


export default AdminPage;