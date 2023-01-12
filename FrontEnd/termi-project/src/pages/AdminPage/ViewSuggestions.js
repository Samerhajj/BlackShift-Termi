import React,{useState,useEffect} from 'react';
import axios from "axios";
import { useNavigate} from 'react-router-dom';
// --> components
import SuggestCard from './SuggestCard';

// --> APIs
import AdminAPI from '../../api/AdminAPI';

import './Admin.css'

const ViewSuggestions = ()=> {
    
 const navigate = useNavigate();
 const [suggestList,setSuggestList] = useState([]);

 // --> functions
 const handleGetAllSuggest = async() =>{
    const response = await AdminAPI.getAllSuggestedTerms();
      if(response.success){
        setSuggestList([...response.body])
     }
     else{
       alert(response.message);
     }
  }
  const handleAdminPanel = () => {
    navigate('/admin');
  };

useEffect(()=>{
    handleGetAllSuggest();
},[])
return (
    <div>
    <div className="banner banner_admin">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="">
              <strong className="text-white">Suggestions</strong>
            </h1>
          </div>
        </div>
      </div>
                    <div className="admin-sg">
               
                    <button className="su-button mb-2" onClick={handleGetAllSuggest}>View Suggestions</button>
                    <button className="su-button mb-2" onClick={handleAdminPanel}>Back To Panel</button>
                    
               </div>
               <div className="container d-flex justify-content-center">

               <div className="mt-5">
               {
                 suggestList.map((item,index)=>{
                   console.log(item);
                   return(<SuggestCard key={index} data={item} suggestList={suggestList} setSuggestList={setSuggestList}/>)
                 })
               }
               </div>
          </div>
    </div>
    )
    
}


export default ViewSuggestions;