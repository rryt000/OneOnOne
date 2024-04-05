import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
//This shits a mess rn. Will continue working on it...

const CalendarPage = () => {
    const [primaryCalendars, setPrimaryCalendars] = useState([]);
    const [secondaryCalendars, setSecondaryCalendars] = useState([]);
    const [newCalendarName, setNewCalendarName] = useState('');
    const [newCalendarComment, setNewCalendarComment] = useState('');

    // Fetch Primary Calendars
    useEffect(() => {
        axios.get('http://localhost:8000/calendars/primary/')
            .then(response => {
                setPrimaryCalendars(response.data);
            })
            .catch(error => {
                console.error('Error fetching primary calendars', error);
            });
    }, []);

    // Fetch Secondary Calendars
    useEffect(() => {
        axios.get('http://localhost:8000/calendars/secondary/')
            .then(response => {
                setSecondaryCalendars(response.data);
            })
            .catch(error => {
                console.error('Error fetching secondary calendars', error);
            });
    }, []);

    // Handle New Calendar Submission
    const handleCreateCalendar = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/calendars/', {
            name: newCalendarName,
            comment: newCalendarComment
        }).then(response => {
            // Add the new calendar to the primary list
            setPrimaryCalendars([...primaryCalendars, response.data]);
            setNewCalendarName('');
            setNewCalendarComment('');
        }).catch(error => {
            console.error('Error creating calendar', error);
        });
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
              <li className="nav-item"><Link className="nav-link current" to="/calendar">Calendars</Link></li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/account">Account</Link></li>
            </ul>
          </div>
        </div>
      </nav>s
        
        <div>
            <h1>Your Calendars</h1>
            
            {/* Calendar Creation Form */}
            <form onSubmit={handleCreateCalendar}>
                <input 
                    type="text"
                    value={newCalendarName}
                    onChange={(e) => setNewCalendarName(e.target.value)}
                    placeholder="Calendar Name"
                    required
                />
                <textarea 
                    value={newCalendarComment}
                    onChange={(e) => setNewCalendarComment(e.target.value)}
                    placeholder="Calendar Comment"
                />
                <button type="submit">Create Calendar</button>
            </form>

            {/* Display Primary Calendars */}
            <h2>Primary Calendars</h2>
            {primaryCalendars.map(calendar => (
                <div key={calendar.id}>
                    <h3>{calendar.name}</h3>
                    <p>{calendar.comment}</p>
                    {/* Additional calendar details */}
                </div>
            ))}

            {/* Display Secondary Calendars */}
            <h2>Secondary Calendars</h2>
            {secondaryCalendars.map(calendar => (
                <div key={calendar.id}>
                    <h3>{calendar.name}</h3>
                    {/* Secondary calendar details */}
                </div>
            ))}
        </div>
        <footer className="footer text-center py-3">
        <p>&copy; 2024 1on1 Meetings. All rights reserved.</p>
      </footer>
    </>
    );
};

export default CalendarPage;
