import React, { useState } from 'react';
import {Form, Modal,Button} from "react-bootstrap";
import PropTypes from 'prop-types'

const EditModal = ({show,setShow}) =>{
      const handleClose = () => setShow(false);
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Conecpt Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Conecpt Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Short Term</Form.Label>
              <Form.Control as="textarea" rows={3} />
              
              <Form.Label>Long Term</Form.Label>
              <Form.Control as="textarea" rows={3} />
              
              <Form.Label>Link</Form.Label>
              <Form.Control as="textarea" rows={3} />
              
            </Form.Group>
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
                <Button variant="secondary" onClick={()=>handleClose()}>
                  Close
                </Button>
                <Button variant="primary" onClick={()=>handleClose()}>
                  Save Changes
                </Button>
            </Modal.Footer>
        </Modal>    
        
    )
}

EditModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func
}

export default EditModal;