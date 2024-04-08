import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CalendarDetailPage = () => {
    const { calendarId } = useParams(); 
    const [calendar, setCalendar] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCalendarDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/calendars/${calendarId}`);
                setCalendar(response.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchCalendarDetails(); 
    }, [calendarId]); 

    if (isLoading) {
        return <div>Loading...</div>; // Show loading message
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message
    }

    return (
        <div>
            <h1>Calendar: {calendar ? calendar.name : 'Not found'}</h1>
            {/* Display calendar details here */}
            <p>{calendar ? calendar.comment : 'No details available'}</p>
            {/* Add more details as required */}
        </div>
    );
};

export default CalendarDetailPage;
