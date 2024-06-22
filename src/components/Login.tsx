// Login.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setUsername(location.state.username || '');
      setPassword(location.state.password || '');
    }
  }, [location.state]);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://calculationtreebackend-i779g6cp7-harsh-tyagis-projects-3fabd221.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if(response.status == 200){
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirect to /home after successful login
      }
      else{
        navigate('/register');
        alert("Invalid/Unregistered username or password. Please register before login.");
      }
      
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show error message, reset state, etc.)
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
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Login</button>
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

export default Login;
