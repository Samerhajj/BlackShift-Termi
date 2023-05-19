import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import React from "react";

const ManageUsersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleShowModal = (email) => {
    setEmail(email);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div className="banner banner_admin">
          <div className="wrapper">
            <div className="banner_content">
              <h1 className="">
                <strong className="">Most searched Terms</strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mohamed Sayed Ahmad</td>
            <td>
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleShowModal("MohamedSayedahmd@gmail.com")
                }
              >
                Click to View
              </span>
            </td>
            <td>
              <FontAwesomeIcon icon={faTrashAlt} />
              <FontAwesomeIcon icon={faEllipsisH} />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>
              <span style={{ cursor: "pointer" }} onClick={() => handleShowModal("jacob.thornton@example.com")}>
                Click to View
              </span>
            </td>
            <td>
              <FontAwesomeIcon icon={faTrashAlt} />
              <FontAwesomeIcon icon={faEllipsisH} />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>
              <FontAwesomeIcon icon={faTrashAlt} />
              <FontAwesomeIcon icon={faEllipsisH} />
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>{email}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageUsersPage;
