import React,{useState} from 'react';
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
// --> components
import SuggestCard from './SuggestCard';


const AdminPage=()=> {
    const navigate=useNavigate();

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
               <div>
                    <button onClick={handleSuggestionPage}>Suggestions from users</button>
                    <button onClick={handleAddTerms}>Admin Add Terms</button>
               </div>
               
    </div>
    </div>
    )
}


export default AdminPage;