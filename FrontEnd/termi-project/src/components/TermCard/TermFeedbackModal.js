import React,{ useState } from 'react';
import { Form, Button, Rate, Input } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Modal } from "react-bootstrap";
// import Rating from 'react-star-ratings';
const TermFeedbackModal = (props) => {
  const [showModalPrompt, setShowModalPrompt] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  
  const customIcons = {
      1: <FrownOutlined />,
      2: <FrownOutlined />,
      3: <MehOutlined />,
      4: <SmileOutlined />,
      5: <SmileOutlined />,
    };
  
  const showFeedbackModal = () =>{
      setShowModalPrompt(false);
      setShowModal(true);
  };
  
  const submitFeedback = (values) => {
      let feedback = {}; 
      if(values){
          feedback = {...values};
      }
      feedback.overallRating = props.overallRating;
      props.submitFeedback(feedback);
      setShowModal(false);
  };
  
  return (
    <>
      <Modal show={showModalPrompt} onHide={() => {setShowModalPrompt(false); submitFeedback()}}>
        <Modal.Header>
          <Modal.Title>Send More Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to provide detailed feedback ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowModalPrompt(false); submitFeedback()}}>
            No
          </Button>
          <Button variant="primary" onClick={() => showFeedbackModal()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Send More Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form name="feedbackForm" form={form} onFinish={submitFeedback}>
                <Form.Item label="Long Term Rating" name="shortTermRating">
                    <Rate character={({ index }) => customIcons[index + 1]} />
                </Form.Item>
              
                <Form.Item label="Long Term Rating" name="longTermRating">
                    <Rate character={({ index }) => customIcons[index + 1]} />
                </Form.Item>
                
                <Form.Item label="Feedback" name="feedbackText">
                    <Input.TextArea />
                </Form.Item>
                
                <Form.Item className="d-flex justify-content-between">
                    <Button className="mt-0" type="primary" htmlType="submit" style={{marginTop: '25px'}}>
                      Send
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                </Form.Item>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TermFeedbackModal;
