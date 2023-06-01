import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotificationsAPI from "../api/NotificationsAPI";
import { Form, Button } from 'react-bootstrap';

function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Add state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      NotificationsAPI.errorNotification('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(process.env.React_App_BaseURL + "auth" + "/" + "reset-password", {
        token,
        password,
      });

      console.log(response.data);
      setSuccess(true); // Set success state to true if response is successful
      NotificationsAPI.successNotification("Password changed successfully");
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="banner banner_login">
        <div className="wrapper">
          <div className="banner_content "></div>
        </div>
      </div>
      <div>
        <h1>Password Reset</h1>
        {error && <div>{error}</div>}
        {success ? ( // Conditionally render success message
          <div>Password changed successfully!</div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        )}
      </div>
    </>
  );
}

export default ResetPasswordPage;
