// Register.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('https://calculationtreebackend-i779g6cp7-harsh-tyagis-projects-3fabd221.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if(response.status === 201){
        alert("Registration Successful");
        navigate('/login', { state: { username, password } }); // Redirect to /login with credentials
      } 
      else{
        throw new Error('Registration failed');
      }
    } 
    catch(error){
      console.error('Registration error:', error);
    }
  };

  const handleClick = () =>{
    navigate('/');
  };

  const buttonStyle = {
    padding: '0',
    background: 'transparent',
    color: '#0d6efd',
    textDecoration: 'none',
    borderColor: 'white',
    fontWeight: '600'
  };

  const paragraphStyle = {
    marginTop: '15px'
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-4">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
            <div className="text-center d-flex mt-3 justify-content-center">
              <button style={buttonStyle} type="submit" className="btn btn-primary" onClick={handleClick}>Click Here</button> <p style={paragraphStyle} className="ps-1">to see calculations</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
