import React,{useState,useEffect,useCallback,useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdminAPI from '../../api/AdminAPI';
import {LoginContext} from "./../../components/LoginContext";

const Top10 = () =>{
    const navigate = useNavigate();
    const [list,setList]= useState([]);
    const {t} = useTranslation();
    const user = useContext(LoginContext);
    const role = user.userData.role;

    const getTop10 = async () =>{
        const res = await AdminAPI.top10(role);
        if(res.success){
            setList(res.body.data);
        }
        else{
            console.log(res.message)
        }
    }
    useEffect(()=>{
        getTop10();
    },[])
// banner_trending
    return(<div>
        <div className="banner banner_admin">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="">
              <strong style={{color:"white"}} className="">Most searched Terms</strong>
            </h1>
          </div>
        </div>
      </div>
    
    <div className="container d-flex justify-content-center mb-2">
        <div className="admin-sg goAndChange">
            <button className="su-button style_for_button_in_viewSuggestions" onClick={handleAdminPanel}>{t('user-suggestions.backtopanel')}</button>
        </div>
    </div>
    
    {
    list.map((item,index)=>{
    //console.log(item);
        return(
        <div key={index}>
            <center>
                    <h5>{item['conceptName']['english']}</h5>
                    <h5>With Search Count : {item['searchCount']}</h5>
            </center>
            <hr></hr>
        </div>
        )
    })
    }
    </div>)
    
  function handleAdminPanel(){
    navigate('/admin');
  };
    
}
export default Top10;