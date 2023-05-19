import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import Leaderboard from "../../../components/Leaderboard/Leaderboard";


function LeaderModal({ onClose, gameName }) {
 
  return (

 
  
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{gameName} Leaderboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Leaderboard context={gameName} changeable={false}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    
    
  );
}

export default LeaderModal;
