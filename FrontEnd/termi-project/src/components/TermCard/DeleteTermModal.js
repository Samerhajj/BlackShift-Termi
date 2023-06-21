import React,{ useState,useContext } from 'react';

import { Modal, Button } from "react-bootstrap";
import { IconContext } from "react-icons";
import { CiCircleRemove } from "react-icons/ci";
import { LoginContext } from "./../LoginContext"

//api 
import AdminAPI from '../../api/AdminAPI';
import NotificationsAPI from '../../api/NotificationsAPI';

function DeleteTermModal(props) {
  
  const user = useContext(LoginContext);
  const role = user.userData.role;
  
  const [showModal, setShowModal] = useState(false);
  
  const handleDelete = async () => {
    // Code to delete the term
    // let data = "6452c209585c45bea205f809";
    let data = props.id;
    const res = await AdminAPI.deleteTermFromSearch(data,role);
    if (res.success) {
        console.log(res);
    } else {
        NotificationsAPI.errorNotification(res.message);
    }
    setShowModal(false);
  };
  
  


  return (
    <>
      <IconContext.Provider value={{ size: "2.5rem" }}>
          <CiCircleRemove  onClick={() => setShowModal(true)}/>
      </IconContext.Provider>
        
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
