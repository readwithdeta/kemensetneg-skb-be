import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('jwt');

    navigate('/login'); 
  };

  const addNewEmployee = () => {
    navigate('/addNewEmployee'); 
  };

  const apiHomePage = () => {
    navigate('/apipage'); 
  };



  return (
    <nav>
      <button onClick={logout}>Logout</button>
      <button onClick={addNewEmployee}>Add New Employee</button>
      <button onClick={apiHomePage}>Home Page</button>
    </nav>
  );
};

export default Navbar;
