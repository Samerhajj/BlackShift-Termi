import React, { useState, useEffect } from "react";
import { diff_match_patch } from "diff-match-patch";
import { Button, Modal } from "react-bootstrap";
import props from 'prop-types';

const TermDiff = ({ oldTerm, newTerm ,showModal,setShowModal,handleSuggest}) => {
  const [diff, setDiff] = useState([]);
  const dmp = new diff_match_patch();


  const getTermWithDiff = (part) => {
    const style = part[0] === -1 ? { textDecoration: "line-through", color: "red" } : part[0] === 1 ? { backgroundColor: "#c8f6c8" } : null;
    return <span style={style}>{part[1]}</span>;
  };
  

  const getOldTerm = () => {
    return diff.map((part, index) => {
      if (part[0] === 0) {
        return part[1];
      } else if (part[0] === -1) {
        return <del key={index}>{getTermWithDiff(part)}
        </del>
      } else {
        return null;
      }
    });
  };

  const getNewTerm = () => {
    return diff.map((part, index) => {
      if (part[0] === 0) {
        return part[1];
      } else if (part[0] === 1) {
        return <ins key={index}>{getTermWithDiff(part)}</ins>;
      } else {
        return null;
      }
    });
  };


// In TermDiff component
const handleSuggestClick = () => {
  // Call the handleSuggest function passed as a prop from AddTermAdmin
   console.log(handleSuggest);
  // // console.log("HELLO");
   if (typeof handleSuggest === "function") {
     handleSuggest();
  }
  // Close the modal
  setShowModal(false);
};
  // Calculate the diff every time the input fields are changed
  useEffect(() => {
    const diffs = dmp.diff_main(oldTerm, newTerm);
    dmp.diff_cleanupSemantic(diffs);
    setDiff(diffs);
  }, [oldTerm, newTerm]);

  return (
    <div>
    

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Term Differences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Old Term</h4>
            <pre>{getOldTerm()}</pre>
          </div>
          <hr/> 
          <div>
            <h4>New Term</h4>
            <pre>{getNewTerm()}</pre>
          </div>
        </Modal.Body>
        <Modal.Footer>  
          <Button variant="primary" onClick={() =>handleSuggestClick()}>
            Suggest
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TermDiff;
