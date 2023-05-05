import React,{ useState } from 'react';

import { Modal, Button } from "react-bootstrap";
import { IconContext } from "react-icons";
import { CiCircleRemove } from "react-icons/ci";

//api 
import AdminAPI from '../../api/AdminAPI';

function DeleteTermModal(props) {
  const [showModal, setShowModal] = useState(false);
  
  const handleDelete = async () => {
    // Code to delete the term
    // let data = "6452c209585c45bea205f809";
    let data = props.id;
    const res = await AdminAPI.deleteTermFromSearch(data);
    if (res.success) {
        console.log(res);
    } else {
        console.log(res.message);
    }
    setShowModal(false);
  };
  
  


  return (
    <>
      <div onClick={() => setShowModal(true)}>
        <IconContext.Provider value={{ size: "3rem" }}>
          <CiCircleRemove />
        </IconContext.Provider>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this term?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteTermModal;