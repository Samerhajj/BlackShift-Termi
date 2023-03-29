import React,{ useState }from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post(process.env.React_App_BaseURL + "auth" + "/" + "reset-password", {
        token,
        password,
      });
      
      console.log(response.data); // handle the response from the backend
    } catch (error) {
      console.log(error.response.data); // handle the error from the backend
      setError(error.response.data.message);
    }
  };
  
  return (
    <>
      <div className="banner banner_login">
      <div className="wrapper">
      <div className="banner_content ">
      </div>
      </div>
      </div>
    <div>
      <h1>Password Reset</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
    </>
  );
}

export default ResetPasswordPage;