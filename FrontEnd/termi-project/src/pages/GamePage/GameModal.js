import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const GameModal = (props)=>{
  const { i18n, t } = useTranslation();
  // <GameModal setShowModal={setShowModal} showModal={showModal} instructions={instructions}/>
    return(
        
        <Modal show={true} onHide={() => props.setShowModal(null)}>
          <Modal.Header className="mx-0" closeButton>
            <Modal.Title className="ms-auto">
              {t(`games.${props.showModal.path.split("/")[2]}.modalTitle`)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {props.instructions[props.showModal.path.split("/")[2]].map((step) => (
                <li key={step.id}>{step.text}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => props.setShowModal(null)}>
              {t('games.backButton')}
            </Button>
          </Modal.Footer>
        </Modal>
    )
}
export default GameModal;
