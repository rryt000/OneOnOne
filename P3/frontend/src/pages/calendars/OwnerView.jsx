import React, { useState } from 'react';
import axios from 'axios';

const OwnerView = ({ calendar, token }) => {
    const backendUrl = 'http://localhost:8000'; 
    const [contactUsername, setContactUsername] = useState('');
    const [newTimeslot, setNewTimeslot] = useState({ startDateTime: '', duration: 30, comment: '' });

    if (!calendar) return <p>Loading...</p>;

    const handleAddContact = async () => {
        try {
            await axios.post(`${backendUrl}/calendars/${calendar.id}/contacts/detail/`,
                { contact_username: contactUsername },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setContactUsername('');
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const handleDeleteContact = async (contactId) => {
        try {
            await axios.delete(`${backendUrl}/calendars/${calendar.id}/contacts/${contactId}/`, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
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
            setNewTimeslot({ startDateTime: '', duration: 30, comment: '' });
        } catch (error) {
            console.error('Error adding timeslot:', error);
        }
    };

    const handleDeleteCalendar = async () => {
        try {
            await axios.delete(`${backendUrl}/calendars/${calendar.id}/`, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
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
                {calendar.contacts.map(contact => (
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
                <button onClick={handleAddTimeslot}>Add Timeslot</button>
            </div>

            <button onClick={handleDeleteCalendar}>Delete Calendar</button>
        </div>
    );
};

export default OwnerView;
