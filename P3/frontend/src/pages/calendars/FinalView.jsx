import React from 'react';
import axios from 'axios';

const FinalView = ({ calendar, token }) => {
    console.log('Finalllllllll')
    const backendUrl = 'http://localhost:8000'; 

    if (!calendar) return <p>Loading...</p>;

    const contacts = calendar.contacts || [];
    const timeslots = calendar.timeslots || [];

    // Function to submit timeslot preferences
    const handleSubmitTimeslotPreference = async (timeslotId, preference) => {
        try {
            await axios.post(`${backendUrl}/calendars/${calendar.id}/vote/`, 
                { timeslot: timeslotId, preference },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Error submitting timeslot preference:', error);
        }
    };

    return (
        <div>
            <h2>Calendar: {calendar.name}</h2>

            {/* List of Contacts */}
            <div>
                <h3>Contacts:</h3>
                <ul>
                    {contacts.map(contact => (
                        <li key={contact.id}>{contact.username} - {contact.has_submitted ? 'Submitted' : 'Not Submitted'}</li>
                    ))}
                </ul>
            </div>

            {/* Timeslot Preferences Submission */}
            <div>
                <h3>Submit Timeslot Preferences:</h3>
                {timeslots.map(timeslot => (
                    <div key={timeslot.id}>
                        <p>Timeslot: {new Date(timeslot.start_date_time).toLocaleString()}</p>
                        <button onClick={() => handleSubmitTimeslotPreference(timeslot.id, 1)}>Low Preference</button>
                        <button onClick={() => handleSubmitTimeslotPreference(timeslot.id, 2)}>Medium Preference</button>
                        <button onClick={() => handleSubmitTimeslotPreference(timeslot.id, 3)}>High Preference</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinalView;
