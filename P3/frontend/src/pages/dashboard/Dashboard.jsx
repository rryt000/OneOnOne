import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="Dashboard.html">1on1</a>
          <button className="navbar-toggler" type="button" dataBsToggle="collapse" dataBsTarget="#navbarNav" ariaControls="navbarNav" ariaExpanded="false" ariaLabel="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item"><a className="nav-link current" href="Dashboard.html">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="Contacts.html">Contacts</a></li>
              <li className="nav-item"><a className="nav-link" href="Calendar.html">Calendars</a></li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="Account.html">Account</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="container-sm">
          <h1 className="text-center my-4">Welcome back user.</h1>
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
              <a href="new_calendar.html" className="btn btn-primary btn-lg">New Calendar</a>
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
