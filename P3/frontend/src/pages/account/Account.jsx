import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './Account.css'; // Adjust the path to your CSS file as necessary

const AccountPage = () => {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted. Implement actual submission logic here.");
        // Implement form submission logic, e.g., updating email/password/username
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
              <li className="nav-item"><Link className="nav-link" to="/calendar">Calendars</Link></li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link current" to="/account">Account</Link></li>
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
                <h4 className="text-center">Change Email</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="oldEmailInput">Old Email</label>
                    <input type="email" className="form-control" id="oldEmailInput" placeholder="oldemail@example.com" required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="newChangeEmailInput">New Email</label>
                    <input type="email" className="form-control" id="newChangeEmailInput" placeholder="newemail@example.com" required />
                  </div>
                  <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary col-12">Save Changes</button>
                  </div>
                </form>

                <hr className="white" />
                <h4 className="text-center">Change Password</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-2">
                    <label htmlFor="oldPasswordInput">Old Password</label>
                    <input type="password" className="form-control" id="oldPasswordInput" placeholder="Enter Old Password" required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="newPasswordInput">New Password</label>
                    <input type="password" className="form-control" id="newPasswordInput" placeholder="Enter New Password" required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="confirmNewPasswordInput">Confirm New Password</label>
                    <input type="password" className="form-control" id="confirmNewPasswordInput" placeholder="Confirm New Password" required />
                  </div>
                  <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary col-12">Save Changes</button>
                  </div>
                </form>

                <hr className="white" />
                <h4 className="text-center">Change Username</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="oldUsernameInput">Old Username</label>
                    <input type="text" className="form-control" id="oldUsernameInput" placeholder="old_name" required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="newUsernameInput">New Username</label>
                    <input type="text" className="form-control" id="newUsernameInput" placeholder="new_name" required />
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
