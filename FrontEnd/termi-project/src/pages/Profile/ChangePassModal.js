import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const ChangePassModal = (props)=>{
  const { i18n, t } = useTranslation();
    return(              <Modal show={props.showPasswordModal} onHide={props.handleClosePasswordModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{t('profile.mpassword')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    {props.showPasswordError && (
                    <div className="error-message">Make sure you enter the same password</div>
                  )}
                
                      <label>
                       {t('profile.mcpassword')}
                      </label>
                      <input type="password" onChange={props.handleChange}   name="currentPassword" className="form-control" value=
                      {props.formValues.currentPassword} minLength="6"/>
                    
                      
                    
                      <label>
                      {t('profile.mnpassword')}
                      </label>
                      <input type="password" onChange={props.handleChange} name="newPassword" className="form-control" value=
                      {props.formValues.newPassword} minLength="6"/>
                    
                    
                    
                      <label>
                        {t('profile.mvpassword')}
                      </label>
                      <input type="password" onChange={props.handleChange} name="validatePassword" className="form-control" value=
                      {props.formValues.validatePassword} minLength="6"/>
                  
                  
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={props.handleClosePasswordModal}>
                    {t('profile.mclose')}
                  </Button>
                  <Button variant="primary" onClick={props.handleSavePasswordChanges}>
                    {t('profile.msavechanges')}
                  </Button>
                </Modal.Footer>
              </Modal>
)
}
export default ChangePassModal;
