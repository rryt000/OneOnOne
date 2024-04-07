import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported
import './Accounts.css'; // Adjust the path to your CSS file as necessary
import { useAuth } from '../../hooks/AuthProvider';
import axios from 'axios';


const AccountPage = () => {

  const auth = useAuth();

    const [formData, setFormData] = useState({
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
      const { id, value } = event.target;
      
      if (value) {
          setFormData({ ...formData, [id]: value });
      } else {
          const {[id]: omitted, ...rest} = formData;
          setFormData(rest);
      }
  };
  

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (formData.username && !/^[a-zA-Z0-9_.]{3,20}$/.test(formData.username)) {
            isValid = false;
            errors.username = "Invalid username. Use 3-20 characters with letters, numbers, dots, or underscores.";
        }

        if (formData.email &&!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            errors.email = "Invalid email format.";
        }

        if (formData.password && formData.password.length < 8) {
            isValid = false;
            errors.password = "Password must be at least 8 characters long.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (validateForm()) {
          try {
              const token = auth.token;
              console.log(formData)
              const response = await axios.put('http://127.0.0.1:8000/accounts/', formData, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });

              console.log("Success:", response.data);
              // Handle success response
          } catch (error) {
              console.error("Error during the API call:", error.response.data);
              // Handle error response
          }
      } else {
          console.log("Form contains errors.", errors);
          // Handle form errors
      }
  };

    return (
        <>
          <nav className="navbar navbar-expand-lg">
            <div className="container">
              <Link className="navbar-brand" to="/dashboard">1on1</Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-lg-0">
                  <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/contacts">Contacts</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/calendar">Calendar</Link></li>
                </ul>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item"><Link className="nav-link current" to="/accounts">Account</Link></li>
                </ul>
              </div>
            </div>
          </nav>

          <main>
            <div className="container-lg">
              <div className="row justify-content-center">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title text-center">Account Settings</h3>
                    <hr className="white" />
                    <form onSubmit={handleSubmit}>
                      {/* Username section */}
                      <div className="form-group mt-2">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="new_username" value={formData.username} onChange={handleChange} />
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                      </div>
                      {/* Email section */}
                      <div className="form-group mt-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="newemail@example.com" value={formData.email} onChange={handleChange} />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>
                      {/* Password section */}
                      <div className="form-group mt-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter New Password" value={formData.password} onChange={handleChange} />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                      </div>
                      {/* First Name section */}
                      <div className="form-group mt-2">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" id="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
                        {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                      </div>
                      {/* Last Name section */}
                      <div className="form-group mt-2">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" id="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
                        {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                      </div>
                      <div className="text-center mt-3">
                        <button type="submit" className="btn btn-primary col-12">Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="footer text-center py-3">
            <p>&copy; 2024 1on1 Meetings. All rights reserved.</p>
          </footer>
        </>
    );
};

export default AccountPage;
