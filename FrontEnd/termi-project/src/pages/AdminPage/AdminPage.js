import React,{useState,useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import AdminAPI from '../../api/AdminAPI';
import {numberOfWordsInTheApp} from './../../api/ApiRoutes'
import axios from 'axios'
import json2csv from 'json2csv';
import fileDownload from 'js-file-download';
import {LoginContext} from "./../../components/LoginContext";

// --> components
import './Admin.css'

const AdminPage=()=> {
  
  const user = useContext(LoginContext);
  const role = user.userData.role;
  const navigate=useNavigate();
  const {t} = useTranslation();
  const [isFlapped, setIsFlapped] = useState(false);
  const [isResultShown, setIsResultShown] = useState(false);
  const [counRes,setCountRes] = useState();
  
  const handleClick = async() => {
    const count_res = await axios.get(numberOfWordsInTheApp);

    console.log(count_res.data['result']);
    setCountRes(count_res.data['result']);
    setIsFlapped(!isFlapped);
    setTimeout(() => {
      setIsResultShown(!isResultShown);
    }, 350);
  };
  
  const getAllUsersLogs = async () => {
  const res = await AdminAPI.fetchAllLogs(role);
  if (res.success) {
    const fields = Object.keys(res.body[0]);
    const opts = { fields };
    try {
      const csv = json2csv.parse(res.body, opts);
      fileDownload(csv, 'users_logs.csv');
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log(res.message);
  }
};
//AdminAPI.fetchAllSearchGameLogs
  const getAllUsersSearchGameLogs = async () => {
  const res = await AdminAPI.fetchAllSearchGameLogs(role);
  if (res.success) {
    res.body.forEach(log => {
      switch (log.category) {
        case "0":
          log.category = "human resources";
          break;
        case "1":
          log.category = "software engineering";
          break;
        case "2":
          log.category = "medic";
          break;
        default:
          log.category = null;
      }
    });
    const fields = Object.keys(res.body[0]);
    const opts = { fields };
    try {
      const csv = json2csv.parse(res.body, opts);
      fileDownload(csv, 'User_Search_Log.csv');
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log(res.message);
  }
};

return (
    <div>
    <div className="banner banner_admin">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="">
              <strong style={{color:"white"}} className="">Welcome Admin User...</strong>

            </h1>
          </div>
        </div>
      </div>
            <div className="container d-flex gap-2 flex-wrap justify-content-center">
                    <button className="w-100 su-button p-3" onClick={handleSuggestionPage}>
                      {t('admin-page.suggest_from_user')}</button>
                      
                    <button className="w-100 su-button p-3" onClick={top10}>
                      {t('admin-page.top_ten')}</button>
                      
                    <button id = "style "
                        className={`w-100 p-3 flapping-button su-button ${isFlapped ? 'flapped' : ''}`}
                        onClick={handleClick}>
                        {isResultShown ? <div>{t('admin-page.total_terms')} : <strong>{counRes}</strong></div> : <span>{t('admin-page.total_terms')}</span>}
                      </button>
                      
                    <button className="w-100 p-3 su-button" onClick={handleAddTerms}>
                      {t('admin-page.add_term')}</button>
                      
                    <button className="w-100 su-button p-3" onClick={handleFeedbackPage}>
                      {t('admin-page.feedback_page')}</button>
                      
                    <button className="w-100 p-3 su-button" onClick={
                    ()=> getAllUsersLogs()}
                    >{t('admin-page.get_activity_log')}</button>
                    
                    <button className="w-100 p-3 su-button" onClick={
                    ()=> getAllUsersSearchGameLogs()}
                    >{t('admin-page.get_log_user')}</button>
                </div>
            <div>
            <div>
              <div className="row row-cols-1 row-cols-lg-2 g-3 m-3">
                <div className="col">
                  <iframe className="admin-most-played-game-chart" src="https://charts.mongodb.com/charts-project-0-jhcuv/embed/charts?id=64734579-2bd3-4a3e-8d10-068df9f7162f&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                </div>
                <div className="col">
                  <iframe className="admin-top10-chart" src="https://charts.mongodb.com/charts-project-0-jhcuv/embed/charts?id=64744e73-979e-4710-8dce-8224fdd947ee&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                </div>
              </div>
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
function handleFeedbackPage(){
    navigate('/admin/feedback');
}
  
};


export default AdminPage;

    {/*<button className="su-button mb-2" onClick={
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
                    >{t('Adminwords.Games')}</button>*/}