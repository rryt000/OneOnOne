import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contacts.css'; // Make sure this path is correct
import { useAuth } from '../../hooks/AuthProvider';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const auth = useAuth();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                // Now the request uses the auth token from the Auth context
                const response = await axios.get('http://127.0.0.1:8000/contacts/contact-lists/', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                setContacts(response.data.contacts); // Assuming the data is the list of contacts
            } catch (error) {
                console.error("Error fetching contacts:", error);
                // Handle error here
            }
        };

        if (auth.token) { // Making sure there is a token before attempting to fetch contacts
            fetchContacts();
        }
    }, [auth.token]);

    const handleSubmit = async (e) => {
        const endpoint = 'http://127.0.0.1:8000/contacts/contact-requests/';
        const data = { 'receiver': username };
        try {
            const response = await axios.post(endpoint, data, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            console.log('Success:', response.data);
            if (response.data.message){
                setMessage('Contact added successfully!');
            }
            else {
                setMessage('Contact request sent.');
            }
            setIsError(false);
            setUsername('');
        } catch (error) {
            console.error('Error during the API call:', error);
            // Extracting server error message
            console.log(error.response.data[0])
            const errorMessage = error.response.data[0];

            setMessage(errorMessage);
            setIsError(true);
        }
    };

    const deleteContact = async (username) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this contact?');
        if (isConfirmed) {
            const contactToDelete = contacts.find(contact => contact.username === username);
            if (!contactToDelete) {
                console.error('Contact not found');
                return;
            }
    
            try {
                // Assuming you need to send the contact's email as data for some reason
                const data = { email: contactToDelete.email };
                await axios.put(`http://127.0.0.1:8000/contacts/contact-lists/`, data, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                console.log('Contact deleted successfully');
                // Update the UI
                const updatedContacts = contacts.filter(contact => contact.username !== username);
                setContacts(updatedContacts);
            } catch (error) {
                console.error('Error during the API call:', error);
            }
        }
    };
    

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/dashboard">1on1</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                            <li className="nav-item"><Link className="nav-link current" to="/contacts">Contacts</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/calendar">Calendars</Link></li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/accounts">Account</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="container mt-4">
                <h2 className="mb-4">Manage Contacts</h2>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Add a Contact</span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        aria-label="Username" 
                        aria-describedby="addon-wrapping" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button className="btn btn-primary" type="button" onClick={handleSubmit} >Sumbit</button>
                </div>
                {message && <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
                <div style={{ overflowX: 'auto' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, index) => (
                                <tr key={index}>
                                    <td>{contact.username}</td>
                                    <td>{contact.first_name}</td>
                                    <td>{contact.last_name}</td>
                                    <td>{contact.email}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteContact(contact.username)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            
            <footer className="footer text-center py-3 container-fluid">
                <p>2024 1on1 Meetings. All rights reserved.</p>
            </footer>
        </>
    );
};

export default ContactsPage;
