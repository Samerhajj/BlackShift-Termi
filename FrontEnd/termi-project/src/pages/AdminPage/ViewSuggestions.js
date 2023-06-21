import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SuggestCard from './SuggestCard';
import Accordion from 'react-bootstrap/Accordion';
import { Row, Col } from 'react-bootstrap/';
import AdminAPI from '../../api/AdminAPI';
import NotificationsAPI from '../../api/NotificationsAPI';
import './Admin.css';
import './ViewSuggestions.css';
import { LoginContext } from './../../components/LoginContext';

const ViewSuggestions = () => {
  const user = useContext(LoginContext);
  const role = user.userData.role;
  const navigate = useNavigate();
  const [suggestList, setSuggestList] = useState([]);
  const { i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  const handleGetAllSuggest = async () => {
    const response = await AdminAPI.getAllSuggestedTerms(role);
    if (response.success) {
      console.log("**********************");
      console.log(response.body);
      console.log("**********************");
      setSuggestList([...response.body]);
    } else {
      NotificationsAPI.errorNotification(response.message);
    }
  };

  const handleAdminPanel = () => {
    navigate('/admin');
  };

  const getDefaultConceptName = (itemConceptName) => {
    const enConceptName = itemConceptName['conceptName']['english'];
    const arConceptName = itemConceptName['conceptName']['arabic'];
    const heConceptName = itemConceptName['conceptName']['hebrew'];

    if (enConceptName != null && enConceptName.trim().length > 0) {
      return enConceptName;
    } else if (arConceptName != null && arConceptName.trim().length > 0) {
      return arConceptName;
    } else {
      return heConceptName;
    }
  };

  return (
    <div>
      <div className="banner banner_admin">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="">
              <strong style={{ color: "white" }} className="">Suggestions</strong>
            </h1>
          </div>
        </div>
      </div>

      <div className="admin-sg">
        <button className="su-button style_for_button_in_viewSuggestions" onClick={handleGetAllSuggest}>
          {t('user-suggestions.viewsuggestions')}
        </button>
        <button className="su-button style_for_button_in_viewSuggestions" onClick={handleAdminPanel}>
          {t('user-suggestions.backtopanel')}
        </button>
      </div>

      <div className="container d-flex justify-content-center">
        <div className="mt-5">
          {suggestList.map((item) => (
            <Row className="d-flex" key={item._id}>
              <Col xs={12} xl={12}>
                <Accordion className="my-3" className="accordion-header">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="headerAccordion">
                      <h2 className="headerAccordion">
                        {getDefaultConceptName(item)}
                        <strong className="font-weight-bold"></strong>
                      </h2>
                      {JSON.stringify(item.conceptName) && (
                        <span className="expand-text" onClick={() => setExpanded(!expanded)}>
                        </span>
                      )}
                    </Accordion.Header>

                    <Accordion.Body className="bodyAccordion">
                      {expanded && <div className="expanded-text">{JSON.stringify(item.conceptName)}</div>}
                      <SuggestCard data={item} suggestList={suggestList} setSuggestList={setSuggestList} initialLanguage={i18n.language} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSuggestions;
