import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AddBottle from './components/AddBottle';
import BottleList from './components/BottleList';
import CountRaffleZero from './components/CountRaffleZero';

function ProtectedRoute({ element }) {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return element; 
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-bottle" element={<ProtectedRoute element={<AddBottle />} />} />
        <Route path="/bottles-list" element={<ProtectedRoute element={<BottleList />} />} />
        <Route path="/" element={<ProtectedRoute element={<CountRaffleZero />} />} />
      </Routes>
    </Router>
  );
}

export default App;
