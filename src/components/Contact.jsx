import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('/api/contact', {
                name,
                email,
                message
            });

            if (response.data.success) {
                setSuccessMessage('Thank you for your message! We will get back to you soon.');
                setErrorMessage('');
                setName('');
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            setErrorMessage('There was an error submitting your message. Please try again.');
        }
    };

    return (
        <div className="contact-form-container bg-warning">
            <h2>Contact Us</h2>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="contact-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name :"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email :"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message :"
                            required
                        ></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
