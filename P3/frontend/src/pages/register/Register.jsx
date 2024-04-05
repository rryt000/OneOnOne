import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is installed
import './Register.css'; // Adjust the CSS file name as necessary
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  // State for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (auth) {
      navigate('/dashboard');
    }
  }, [auth, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Construct the form data object
    const formData = {
      username,
      email,
      password,
      confirmPassword,
      first_name,
      last_name,
    };
  
    try {
      // Send a POST request
      const response = await fetch('http://127.0.0.1:8000/account/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Wait for the response and convert it to JSON
      const data = await response.json();
  
      // Check if the request was successful
      if (response.ok) {
        // Handle success - you might want to clear the form or redirect the user
        console.log('Registration successful:', data);
        // Redirect or update UI here
      } else {
        // Handle errors - the server might return error messages or status codes
        console.error('Registration failed:', data.error);
        // Update UI to show error message
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      // Update UI to show error message
    }
  };
  

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Welcome Aboard!</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="UsernameInput" className="form-label">Username</label>
                  <input type="text" className="form-control" id="UsernameInput" placeholder="Jane Doe" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="emailInput" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="emailInput" placeholder="janedoe@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="passwordInput" className="form-label">Password</label>
                  <input type="password" className="form-control" id="passwordInput" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="firstNameInput" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstNameInput" required value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="lastNameInput" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastNameInput" required value={last_name} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary col-12 mt-3">Create Account</button>
                <div className="text-center mt-2">
                  <p>Already have an account? <Link to="/login">Log In</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
