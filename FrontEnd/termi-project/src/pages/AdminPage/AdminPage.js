import React,{useState} from 'react';
import axios from "axios";

// --> components
import SuggestCard from './SuggestCard';

// --> APIs
import AdminAPI from '../../api/AdminAPI';

const AdminPage=()=> {
    
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
                    <button onClick={handleGetAllSuggest}>dont click</button>
               </div>
               <div className="mt-5">
               {
                 suggestList.map((item,index)=>{
                   console.log(item);
                   return(<SuggestCard key={index} data={item}/>)
                 })
               }
               </div>
          </div>
    </div>
    )
}


export default AdminPage;