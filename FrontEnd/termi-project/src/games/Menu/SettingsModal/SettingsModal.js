import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import CategorySelector from "../../../components/CategorySelector"

function SettingsModal({ onClose , initialCategory, categoryChanged}) {
  return (
      <Modal show={true} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategorySelector category={initialCategory} categoryChanged={(newCategory) => {categoryChanged(newCategory)}}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
