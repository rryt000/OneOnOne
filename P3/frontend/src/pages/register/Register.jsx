import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Ensure this matches the correct path to your CSS file
import { useAuth } from "../../hooks/AuthProvider"; // Adjust the path as necessary
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const { registerAction, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = {
      username,
      email,
      password,
      first_name,
      last_name,
    };

    await registerAction(formData);
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
