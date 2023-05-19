import React, { useState } from "react";
import FeedbackAPI from "../../api/FeedbackAPI";
import { useTranslation } from "react-i18next";
import { useNavigate} from 'react-router-dom';

import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import './Admin.css'
    // // Check if the `term` array exists and has at least one item
    // const conceptName = item.term?.[0]?.conceptName?.english ?? 'N/A';
const FeedBack = () => {
  const [list, setList] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();


  function handleAdminPanel(){
    navigate('/admin');
  };
  const getTheData = async () => {
    const res = await FeedbackAPI.handle_getAllFeedback();
    if (res.success) {
      console.log(res.body);
      setList(res.body);
    } else {
      console.log(res.message);
    }
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

  return (
    <div>
      <div className="banner banner_admin">
        <div className="wrapper " style={{zIndex: 1}}>
          <div className="banner_content">
            <h1 className="">
              <strong className="">{t('admin_feedback_page.title')}</strong>
            </h1>
          </div>
        </div>
      </div>

      <div className="container ">
      <center>

        
        <div className="container d-flex justify-content-center mb-2">
                <Button onClick={getTheData} style={{backgroundColor: '#93DC74',color:"black",padding: '15px', fontSize: '14px', margin: '3px', marginBottom: '0px', marginTop: '0px', zIndex: 5, borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', WebkitBackdropFilter: 'blur(3.6px)', border: '1px solid rgba(255, 255, 255, 0.4)'}}>
            {t('admin-page.fetch_feedback')}
        </Button>
            <div className="admin-sg goAndChange">
                <button className="su-button style_for_button_in_viewSuggestions" onClick={handleAdminPanel}>{t('user-suggestions.backtopanel')}</button>
            </div>
        </div>
       </center>
        <div className="feedback-list mt-4">
{list.map((item, index) => {
    const defaultConceptName = item.term && item.term[0] ? getDefaultConceptName(item.term[0]) : 'N/A';
    return (<>
        <Card key={index}>
            <Card.Body className="feedback-inside-box-bg-color">
                <Card.Title>{defaultConceptName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                {item.user && item.user[0] && item.user[0].fullName ? item.user[0].fullName : 'N/A'}
                </Card.Subtitle>

                <ListGroup className="mt-3">
                    <ListGroupItem>
                        {t('admin_feedback_page.Overall_Rating')}: {item.overallRating}
                    </ListGroupItem>
                    <ListGroupItem>
                        {t('admin_feedback_page.Short_Definition_Rating')}: {item.shortDefinitionRating}
                    </ListGroupItem>
                    <ListGroupItem>
                        {t('admin_feedback_page.Long_Definition_Rating')}: {item.longDefinitionRating}
                    </ListGroupItem>
                    <ListGroupItem>
                        {t('admin_feedback_page.Feedback_Text')}: {item.feedbackText}
                    </ListGroupItem>
                </ListGroup>
            </Card.Body>
        </Card>
        <br/>
        </>
    );
})}

        </div>
      </div>
    </div>
  );
};

export default FeedBack;
