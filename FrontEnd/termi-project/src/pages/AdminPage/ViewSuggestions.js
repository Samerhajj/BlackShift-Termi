import React,{useState} from 'react';
import axios from "axios";
import { useNavigate} from 'react-router-dom';
// --> components
import SuggestCard from './SuggestCard';

// --> APIs
import AdminAPI from '../../api/AdminAPI';

const ViewSuggestions=()=> {
    
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


return (
    <div>
    <div className="banner banner_profile">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="pulsing-element">
              <strong>Welcome to Suggestions</strong>
            </h1>
          </div>
        </div>
      </div>
               <div className="container d-flex justify-content-center">
               <div>
                    <button onClick={handleGetAllSuggest}>View Suggestions</button>
                      <button onClick={handleAdminPanel}>Back To Panel</button>
               </div>
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