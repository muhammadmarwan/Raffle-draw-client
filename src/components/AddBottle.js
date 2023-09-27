import React, { useState, useEffect } from 'react';
import './styles/Signup.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userToken, setUserToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken'); 
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();

    try {  
        const data = {
          name: name,
          brand: brand,
        };
        const response = await fetch('http://localhost:5001/add-bottle/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${userToken}`,        

          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
            const responseData = await response.json();

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
      <h2>Add bottil</h2>
      <form className="signup-form" onSubmit={handleSignin}>
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Brand:</label>
          <select
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option value="">Select Brand</option>
            <option value="Pepsi">Pepsi</option>
            <option value="Cola">Cola</option>
            <option value="Masafi">Masafi</option>
            <option value="Alain">Alain</option>
            <option value="Alravabi">Alravabi</option>
          </select>
        </div>
        
        <button type="submit" className="submit-button">
        Add bottil
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Signin;
