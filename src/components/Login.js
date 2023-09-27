import React, { useState } from 'react';
import './styles/Signup.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {  
        const data = {
          username: username,
          password: password,
        };
        const response = await fetch('http://localhost:5001/signin/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
            const responseData = await response.json();
            const token = responseData.token;

            console.log(token)
            localStorage.setItem('userToken', token);

          setSuccessMessage('Signin successful');
          setErrorMessage('');   
          navigate('/');     
        } else {
          setErrorMessage('Signin failed. Please try again.');
          setSuccessMessage('');
        }

      
    } catch (error) {
      console.error(error);
      setErrorMessage('Signin failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>
      <form className="signup-form" onSubmit={handleSignin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit" className="submit-button">
        Signin
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Signin;
