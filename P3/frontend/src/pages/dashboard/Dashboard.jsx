import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { useAuth } from "../../hooks/AuthProvider";

const Dashboard = () => {

  const auth = useAuth();

  console.log(auth.user);

  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // State to handle navbar collapse

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
   
    <nav className="navbar navbar-expand-lg">
        <div className="container">
            <span className="navbar-brand" to="/dashboard/">1on1</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed} 
                    aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                <ul className="navbar-nav me-auto mb-lg-0">
                    <li className="nav-item"><Link className="nav-link current" to="/dashboard/">Dashboard</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/contacts/">Contacts</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/calendars/">Calendars</Link></li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><Link className="nav-link" to="/accounts/">Account</Link></li>
                    <li className="nav-item">
                        <a className="nav-link" href="#!" onClick={(e) => {
                            e.preventDefault();
                            auth.logOut();
                        }}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
 

      <main>
        <div className="container-sm">
          <h1 className="text-center my-4">Welcome back {auth.user?.username}.</h1>
          <div className="row row-gap-4">
            <div className="d-flex flex-column align-items-center col-12">
              <h2>Upcoming Meetings</h2>
              <div className="list-group">
                <button type="button" className="list-group-item list-group-item-action">Monday, March 3rd at 3pm with Jason</button>
              </div>
            </div>
            <div className="col-6">
              <h2>Jump back into an existing calendar.</h2>
              <div className="list-group">
                <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">Calendar 1 <span className="badge rounded-pill">1</span></button>
                <button type="button" className="list-group-item list-group-item-action">Calendar 2</button>
                <button type="button" className="list-group-item list-group-item-action">Calendar 3</button>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center col-6">
              <h2>Start a new calendar.</h2>
              <a href="calendars" className="btn btn-primary btn-lg">New Calendar</a>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer text-center py-3 container-fluid">
        <p>2024 1on1 Meetings. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Dashboard;
