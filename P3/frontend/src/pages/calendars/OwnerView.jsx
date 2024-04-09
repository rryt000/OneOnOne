import React, { useState } from 'react';
import axios from 'axios';

const OwnerView = ({ calendar, token }) => {
    const backendUrl = 'http://localhost:8000';
    const [contactUsername, setContactUsername] = useState('');
    const [newTimeslot, setNewTimeslot] = useState({
        startDateTime: '',
        duration: 30,
        comment: '',
        preference: 1
    });

    if (!calendar) return <p>Loading...</p>;

    const contacts = Array.isArray(calendar.contacts) ? calendar.contacts : [];

    const handleAddContact = async () => {
        try {
            await axios.post(`${backendUrl}/calendars/${calendar.id}/contacts/detail/`,
                { contact_username: contactUsername },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setContactUsername('');
            // Consider fetching the updated list of contacts here
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const handleDeleteContact = async (contactId) => {
        try {
            await axios.delete(`${backendUrl}/calendars/${calendar.id}/contacts/${contactId}/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Consider fetching the updated list of contacts here
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleAddTimeslot = async () => {
        try {
            await axios.post(`${backendUrl}/calendars/${calendar.id}/timeslots/`,
                newTimeslot,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewTimeslot({ startDateTime: '', duration: 30, comment: '', preference: 1 });
            // Consider fetching the updated list of timeslots here
        } catch (error) {
            console.error('Error adding timeslot:', error.response ? error.response.data : error);
        }
    };

    const handleDeleteCalendar = async () => {
        try {
            await axios.delete(`${backendUrl}/calendars/${calendar.id}/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Redirect or update the UI after deleting the calendar
        } catch (error) {
            console.error('Error deleting calendar:', error);
        }
    };

    return (
        <div>
            <h2>Calendar: {calendar.name}</h2>

            <div>
                <input
                    type="text"
                    value={contactUsername}
                    onChange={(e) => setContactUsername(e.target.value)}
                    placeholder="Enter contact's username"
                />
                <button onClick={handleAddContact}>Add Contact</button>
            </div>

            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        {contact.name} - {contact.has_submitted ? 'Submitted' : 'Not Submitted'}
                        <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <div>
                <input
                    type="datetime-local"
                    value={newTimeslot.startDateTime}
                    onChange={(e) => setNewTimeslot({ ...newTimeslot, startDateTime: e.target.value })}
                    placeholder="Start Date and Time"
                />
                <input
                    type="number"
                    value={newTimeslot.duration}
                    onChange={(e) => setNewTimeslot({ ...newTimeslot, duration: e.target.value })}
                    placeholder="Duration (minutes)"
                />
                <input
                    type="text"
                    value={newTimeslot.comment}
                    onChange={(e) => setNewTimeslot({ ...newTimeslot, comment: e.target.value })}
                    placeholder="Comment (Optional)"
                />
                <select
                    value={newTimeslot.preference}
                    onChange={(e) => setNewTimeslot({ ...newTimeslot, preference: e.target.value })}
                >
                    <option value="1">Low Preference</option>
                    <option value="2">Medium Preference</option>
                    <option value="3">High Preference</option>
                </select>
                <button onClick={handleAddTimeslot}>Add Timeslot</button>
            </div>

            <button onClick={handleDeleteCalendar}>Delete Calendar</button>
        </div>
    );
};

export default OwnerView;
