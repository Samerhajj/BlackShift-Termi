import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import AdminAPI from '../../api/AdminAPI';
import {numberOfWordsInTheApp} from './../../api/ApiRoutes'
import axios from 'axios'
import json2csv from 'json2csv';
import fileDownload from 'js-file-download';

// --> components
import './Admin.css'

// <IconBell />

const AdminPage=()=> {
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
  
  
  //
  
  const getAllUsersLogs = async () => {
  const res = await AdminAPI.fetchAllLogs();
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
  const res = await AdminAPI.fetchAllSearchGameLogs();
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
              <strong className="text-white">Welcome Admin User...</strong>
            </h1>
          </div>
        </div>
      </div>
            <div className="container d-flex justify-content-center">
                <div className="admin-body">
                    <button className=" su-button mb-2" onClick={handleSuggestionPage}>
                    Suggestions from users</button>
                    <button className=" su-button mb-2" onClick={top10}>
                    Top 10</button>
                    <button id = "style "
                        className={`flapping-button su-button mb-2 ${isFlapped ? 'flapped' : ''}`}
                        onClick={handleClick}>
                        {isResultShown ? <div>Number of Terms is : <strong>{counRes}</strong></div> : <span>Total Number Of Terms</span>}
                      </button>
                    <button className="su-button mb-2" onClick={
                    handleAddTerms}>Admin Add Terms</button>
                
                    <button className="su-button mb-2" onClick={
                    ()=> getAllUsersLogs()}
                    >Get Data Switch  Language Activity Logs</button>
                    <button className="su-button mb-2" onClick={
                    ()=> getAllUsersSearchGameLogs()}
                    >Get User Search Game Logs</button>
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