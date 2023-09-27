import React, { useState, useEffect } from 'react';
import './styles/BottleList.css'; 
import { format } from 'date-fns';

function BottleList() {
  const [bottles, setBottles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  let idCounter = 1;

  useEffect(() => {
    const authToken = localStorage.getItem('userToken');

    fetch('http://localhost:5001/user-bottles/', {
      headers: {
        Authorization: `${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setBottles(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Failed to fetch bottles data. Please try again.');
      });
  }, []);

  return (
    <div className="bottle-list-container">
      <h2>Customer-Added Bottles</h2>
      <table className="bottle-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bottles.map((bottle) => (
            <tr key={bottle.id}>
              <td>{idCounter++}</td>
              <td>{bottle.name}</td>
              <td>{bottle.brand}</td>
              <td>{format(new Date(bottle.createdDate), 'yyyy-MM-dd HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default BottleList;
