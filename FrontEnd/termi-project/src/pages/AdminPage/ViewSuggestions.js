import React,{useState,useEffect} from 'react';
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// --> components
import SuggestCard from './SuggestCard';
import Accordion from 'react-bootstrap/Accordion';
import {Row,Col} from 'react-bootstrap/';
// --> APIs
import AdminAPI from '../../api/AdminAPI';

import './Admin.css'
import './ViewSuggestions.css';

const ViewSuggestions = ()=> {
    
const navigate = useNavigate();
const [suggestList,setSuggestList] = useState([]);
const { i18n } = useTranslation();
const [expanded, setExpanded] = useState(false);
const { t } = useTranslation();

 // --> functions
 const handleGetAllSuggest = async() =>{
    const response = await AdminAPI.getAllSuggestedTerms();
      if(response.success){
        console.log("**********************");
        console.log(response.body);
        console.log("**********************");
        setSuggestList([...response.body])
     }
     else{
       alert(response.message);
     }
  }
  
  const handleAdminPanel = () => {
    navigate('/admin');
  };
  
  //get the default conceptName of term
  const getDefaultConceptName = (itemConceptName) => {
      const enConceptName = itemConceptName['conceptName']['english'];
      const arConceptName = itemConceptName['conceptName']['arabic'];
      const heConceptName = itemConceptName['conceptName']['hebrew'];
      
      if(enConceptName != null && enConceptName.trim().length > 0)
      {
          return enConceptName;
      }
      else if(arConceptName != null && arConceptName.trim().length > 0)
      {
          return arConceptName;
      }
      else
      {
          return heConceptName;
      }
  }
  
  

// useEffect(()=>{
//     handleGetAllSuggest();
// },[])


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
        <button className="su-button mb-2" onClick={handleGetAllSuggest}>{t('user-suggestions.viewsuggestions')}</button>
        <button className="su-button mb-2" onClick={handleAdminPanel}>{t('user-suggestions.backtopanel')}</button>
    </div>
                    
                   
    <div className="container d-flex justify-content-center">

        <div className="mt-5">
        {
            suggestList.map((item,index)=>{
            console.log(item);
            return(
            <>
                <Row className="d-flex">
                <Col xs={12} xl={12}>
                <Accordion className="my-3"  className="accordion-header">
                        
                                                               

                    <Accordion.Item  eventKey="0">
                    
                        <Accordion.Header className="headerAccordion">
                            <h2 className="headerAccordion">
                                { getDefaultConceptName(item) }
                                <strong className="font-weight-bold"></strong>
                            </h2>
                                
                                {JSON.stringify(item.conceptName) && 
                                    <span className="expand-text" onClick={() => setExpanded(!expanded)}>
                                    </span>}
                                    
                        </Accordion.Header>
                                            
                                        
                        <Accordion.Body className="bodyAccordion">
                            {expanded && <div className="expanded-text">{JSON.stringify(item.conceptName)}</div>}
                            <SuggestCard key={index} data={item} suggestList={suggestList} setSuggestList={setSuggestList} initialLanguage={i18n.language}/>
                        </Accordion.Body>
                        
                    </Accordion.Item>
                        
                </Accordion>  </Col>

                </Row>
            </>)
            
            })}
        </div>
    </div>
    </div>
    )
    
}


//    {JSON.stringify(item.conceptName).length > 24 ? 
//      JSON.stringify(item.conceptName).substring(0, 24) + '...' : 
//      JSON.stringify(item.conceptName)}
export default ViewSuggestions;