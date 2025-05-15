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
            setSuccessMessage('');
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
            } else {
                setErrorMessage('Submission failed. Please try again.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('There was an error submitting your message. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.contactFormContainer}>
            <h2>Contact Us</h2>

            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

            <div style={styles.contactCard}>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name :"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email :"
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
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

            <footer style={styles.contactFooter}>
                <p>Contact us for any inquiries or feedback.</p>
            </footer>
        </div>
    );
};

// Inline CSS styles
const styles = {
    contactFormContainer: {
        padding: '20px',
        backgroundColor: 'warning',
        borderRadius: '5px',
        maxWidth: '600px',
        margin: '0 auto'
    },
    contactCard: {
        backgroundColor: '#000',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    formGroup: {
        marginBottom: '15px'
    },
    successMessage: {
        color: 'green',
        marginBottom: '15px'
    },
    errorMessage: {
        color: 'red',
        marginBottom: '15px'
    },
    contactFooter: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '14px',
        color: '#000'
    }
};

export default ContactForm;
