import React, { useState, useEffect } from 'react';
import './styles/SetRaffle.css'; 
import { useNavigate } from 'react-router-dom';

function SetRaffle() {
    const [selectedValue, setSelectedValue] = useState('1');
    const [raffleValue, setRaffleValue] = useState('1');
    const [options, setOptions] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();


  useEffect(() => {

    const authToken = localStorage.getItem('userToken'); 

    fetch('http://localhost:5001/count-raffle-pending/', {
      headers: {
        Authorization: `${authToken}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const numbersArray = Array.from({ length: data.Count }, (_, i) => i + 1);
        setOptions(numbersArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleSetRaffle = async (e) => {
    e.preventDefault();

    try {
      const data = {
        count: raffleValue,
      };
      const authToken = localStorage.getItem('userToken'); 
      const response = await fetch('http://localhost:5001/set-raffle/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`, 
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage('Raffle value updated successfully');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to update raffle value. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to update raffle value. Please try again.');
      setSuccessMessage('');
    }
  };


  return (
    <div className="set-raffle-container">
        <button
        type="button"
        className="add-bottle-button"
        onClick={() => navigate('/add-bottle')}
        >
        Add Bottles
        </button>
        <button
        type="button"
        className="list-bottle-button"
        onClick={() => navigate('/bottles-list')}
        >
        Bottles List
        </button>
      <form className="set-raffle-form" onSubmit={handleSetRaffle}>
        
      <div className="form-group">
          <label htmlFor="raffleValue">Raffle Value:</label>
          <select
            id="raffle"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {options.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Set Raffle
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default SetRaffle;
