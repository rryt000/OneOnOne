import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../hooks/AuthProvider";
import OwnerView from './OwnerView'; // Update the path as necessary
import ContactView from './ContactView'; // Update the path as necessary

const CalendarDetailPage = () => {
    const { token, user } = useAuth(); // Get user from useAuth directly
    const { calendarId } = useParams();
    const backendUrl = 'http://localhost:8000';

    const [calendar, setCalendar] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCalendar = async () => {
            if (!token || !calendarId) {
                console.error('Token or calendarId is not available');
                setError('Token or calendarId is not available');
                return;
            }
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const response = await axios.get(`${backendUrl}/calendars/${calendarId}`, config);
                setCalendar(response.data);
                console.log('Owner ID:', response.data.owner_id, typeof response.data.owner_id);
                console.log('User ID:', user.id, typeof user.id);

                setIsOwner(response.data.owner_id === user.id); // Use user.id directly
            } catch (error) {
                console.error('Error fetching calendar:', error);
                setError('Failed to load calendar data.');
            }
        };

        if (token && user) { // Ensure token and user are available before making the request
            fetchCalendar();
        }
    }, [calendarId, token, user]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>{calendar ? calendar.name : 'Loading...'}</h1>
            {isOwner ? <OwnerView calendar={calendar} token={token} /> : <ContactView calendar={calendar} />}
        </div>
    );
};

export default CalendarDetailPage;
