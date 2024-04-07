import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
//This shits a mess rn. Will continue working on it...

const CalendarPage = () => {
    const [primaryCalendars, setPrimaryCalendars] = useState([]);
    const [secondaryCalendars, setSecondaryCalendars] = useState([]);

  // Backend base URL (adjust as needed)
  const backendUrl = 'http://localhost:8000';

  useEffect(() => {
    // Fetching Primary Calendars
    axios.get(`${backendUrl}/calendars/primary`)
      .then(response => {
        setPrimaryCalendars(response.data);
      })
      .catch(error => console.error('Error fetching primary calendars:', error));

    // Fetching Secondary Calendars
    axios.get(`${backendUrl}/calendars/secondary`)
      .then(response => {
        setSecondaryCalendars(response.data);
      })
      .catch(error => console.error('Error fetching secondary calendars:', error));
  }, []);

  // Combine both Primary and Secondary Calendars and filter
  const allCalendars = [...primaryCalendars, ...secondaryCalendars];
  const finalizedCalendars = allCalendars.filter(calendar => calendar.status === 'Finalized');
  const submittedCalendars = allCalendars.filter(calendar => calendar.status === 'Submitted');
  const inProgressCalendars = allCalendars.filter(calendar => calendar.status === 'In progress');

    return (
        <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">1on1</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contacts">Contacts</Link></li>
              <li className="nav-item"><Link className="nav-link current" to="/calendar">Calendars</Link></li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/account">Account</Link></li>
            </ul>
          </div>
        </div>
      </nav>
        
      <main>
        <div className="container-sm">
          <h1 className="text-center my-4">Your Calendars.</h1>
          <div className="row">
            {/* Finalized Calendars */}
            <div className="col-md-4">
              <h2>Finalized Calendars</h2>
              <div className="list-group">
                {finalizedCalendars.map(calendar => (
                  <a key={calendar.id} href={`calendar/${calendar.id}`} className="list-group-item list-group-item-action">
                    {calendar.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Submitted Calendars */}
            <div className="col-md-4">
              <h2>Submitted Calendars</h2>
              <div className="list-group">
                {submittedCalendars.map(calendar => (
                  <a key={calendar.id} href={`calendar/${calendar.id}`} className="list-group-item list-group-item-action">
                    {calendar.name}
                  </a>
                ))}
              </div>
            </div>

            {/* In Progress Calendars */}
            <div className="col-md-4">
              <h2>In Progress Calendars</h2>
              <div className="list-group">
                {inProgressCalendars.map(calendar => (
                  <a key={calendar.id} href={`calendar/${calendar.id}`} className="list-group-item list-group-item-action">
                    {calendar.name}
                  </a>
                ))}
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

export default CalendarPage;
