import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CalendarDetailPage = () => {
    const { calendarId } = useParams(); // This gets the calendar ID from the URL
    const [calendar, setCalendar] = useState(null); // State to store calendar details
    const [isLoading, setIsLoading] = useState(true); // State to handle loading status
    const [error, setError] = useState(null); // State to handle any errors

    useEffect(() => {
        // Function to fetch calendar details from the backend
        const fetchCalendarDetails = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get(`http://localhost:8000/calendars/${calendarId}`);
                setCalendar(response.data); // Set calendar details in state
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setIsLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchCalendarDetails(); // Call the function to fetch data
    }, [calendarId]); // Effect dependency array

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
