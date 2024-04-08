import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import './Calendars.css';

const CalendarPage = () => {
    const auth = useAuth();
    const { token } = useAuth();
    const [primaryCalendars, setPrimaryCalendars] = useState([]);
    const [secondaryCalendars, setSecondaryCalendars] = useState([]);

    const backendUrl = 'http://localhost:8000';
    const [newCalendarName, setNewCalendarName] = useState('');

    const handleAddCalendar = async (event) => {
        event.preventDefault();
        const calendarData = { name: newCalendarName };
        try {
            const response = await axios.post(`${backendUrl}/calendars/primary/`, calendarData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const newCalendar = response.data;
            setPrimaryCalendars([...primaryCalendars, newCalendar]);
            setNewCalendarName('');  
        } catch (error) {
            console.error('Error creating calendar:', error);
        }
    };

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // Fetching Primary Calendars
        axios.get(`${backendUrl}/calendars/primary`, config)
            .then(response => {
                setPrimaryCalendars(response.data);
            })
            .catch(error => console.error('Error fetching primary calendars:', error));

        // Fetching Secondary Calendars
        axios.get(`${backendUrl}/calendars/secondary`, config)
            .then(response => {
                setSecondaryCalendars(response.data);
            })
            .catch(error => console.error('Error fetching secondary calendars:', error));
    }, [token]);

  const finalizedCalendars = primaryCalendars.filter(calendar => calendar.status === 'finalized');
  const submittedCalendars = primaryCalendars.filter(calendar => calendar.status === 'submitted');
  const inProgressCalendars = primaryCalendars.filter(calendar => calendar.status === 'created');

  const contactFinalizedCalendars = secondaryCalendars.filter(calendar => calendar.calendar_status === 'finalized');
  const contactSubmittedCalendars = secondaryCalendars.filter(calendar => calendar.calendar_status === 'submitted');
  const contactInProgressCalendars = secondaryCalendars.filter(calendar => calendar.calendar_status === 'not_submitted');

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
              <li className="nav-item"><a className="nav-link" href="#!" onClick={(e) => {
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
    <h1 className="text-center my-4">Primary Calendars</h1>
    <div className="add-calendar-form">
        <form onSubmit={handleAddCalendar} className="calendar-form">
            <input 
                type="text" 
                value={newCalendarName} 
                onChange={(e) => setNewCalendarName(e.target.value)} 
                placeholder="Enter a Calendar Name" 
                required 
            />
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    </div>
          <div className="row">
            {/* Finalized Calendars */}
            <div className="col-md-4">
              <h2>Finalized Calendars</h2>
              <div className="list-group">
                {finalizedCalendars.map(calendar => (
                  <Link to={`/calendars/${calendar.id}`} className="list-group-item list-group-item-action" key={calendar.id}>
                  {calendar.name}
                </Link>
                ))}
              </div>
            </div>

            {/* Submitted Calendars */}
            <div className="col-md-4">
              <h2>Submitted Calendars</h2>
              <div className="list-group">
                {submittedCalendars.map(calendar => (
                  <Link to={`/calendars/${calendar.id}`} className="list-group-item list-group-item-action" key={calendar.id}>
                  {calendar.name}
                </Link>
                ))}
              </div>
            </div>

            {/* In Progress Calendars */}
            <div className="col-md-4">
              <h2>In Progress Calendars</h2>
              <div className="list-group">
                {inProgressCalendars.map(calendar => (
                  <Link to={`/calendars/${calendar.id}`} className="list-group-item list-group-item-action" key={calendar.id}>
                  {calendar.name}
                </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container-sm">
    <h1 className="text-center my-4">Secondary Calendars</h1>
     
          <div className="row">
            {/* Finalized Calendars */}
            <div className="col-md-4">
              <h2>Finalized Calendars</h2>
              <div className="list-group">
                {contactFinalizedCalendars.map(calendar => (
                  <Link to={`/calendars/${calendar.id}`} className="list-group-item list-group-item-action" key={calendar.id}>
                  {calendar.name}
                </Link>
                ))}
              </div>
            </div>

            {/* Submitted Calendars */}
            <div className="col-md-4">
              <h2>Submitted Calendars</h2>
              <div className="list-group">
                {contactSubmittedCalendars.map(calendar => (
                  <Link to={`/calendars/${calendar.id}`} className="list-group-item list-group-item-action" key={calendar.id}>
                  {calendar.name}
                </Link>
                ))}
              </div>
            </div>

            {/* In Progress Calendars */}
            <div className="col-md-4">
              <h2>In Progress Calendars</h2>
              <div className="list-group">
                {contactInProgressCalendars.map(calendar => (
                  <Link to={`/calendars/${calendar.id}`} className="list-group-item list-group-item-action" key={calendar.id}>
                  {calendar.name}
                </Link>
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
