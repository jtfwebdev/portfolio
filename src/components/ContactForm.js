// Import necessary libraries or components for popup styling
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/ContactForm.css';
import { motion } from 'framer-motion';

const ContactForm = ({contactForm}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [query, setQuery] = useState('');

    const [buttonText, setButtonText] = useState('Submit');
    const [showEmailPopup, setShowEmailPopup] = useState(false);

    const formRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                // Hide the popup when the user starts typing in the email field
                setShowEmailPopup(false);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'query':
                setQuery(value);
                break;
            default:
                break;
        }
    };

    const handleEmailBlur = () => {
        // Check if the email format is valid and the email field is not empty
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() !== '' && !emailRegex.test(email)) {
            // If not valid and not empty, show the email format popup
            setShowEmailPopup(true);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // Update button text to "Invalid email"
            setButtonText('Invalid email');

            // After 2 seconds, revert button text to "Submit"
            setTimeout(() => {
                setButtonText('Submit');
            }, 2000);

            return;
        }

        // Check if all fields are filled
        if (name.trim() !== '' && phone.trim() !== '' && query.trim() !== '') {

            emailjs.sendForm('portfolio_query', 'portfolio_query_template', formRef.current, '_sXr4SluBLF-ldJB5')
            .then(() => {
                setButtonText('Submitted');
                setTimeout(() => {
                    setButtonText('Submit');
                    clearData();
                }, 2000);
            })
            .catch(() => {
                setButtonText('Failed - please try again later');
                setTimeout(() => {
                    setButtonText('Submit');
                    clearData();
                }, 2000);
            })
        }

         // After 2 seconds, revert button text to "Submit" and clear data
        setTimeout(() => {
            setButtonText('Submit');
            clearData();
        }, 2000);
    };

    function clearData() {
        setName('');
        setEmail('');
        setPhone('');
        setQuery('');
        console.log('Cleared');
    }

    return (
        <motion.div className="form-wrapper" ref={contactForm} initial={{opacity: 0, x: -100}}>
            <form className="styled-form" onSubmit={handleSubmit} ref={formRef}>
                <label className="input-label" htmlFor="name">
                    Name
                </label>
                <input
                    className="input"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                />
                <label className="input-label" htmlFor="email">
                    Email
                </label>
                {showEmailPopup && (
                    <span className="popup-text">Invalid email format</span>
                )}
                <input
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur} // Validate email format on blur
                    required
                />
                <label className="input-label" htmlFor="phone">
                    Phone
                </label>
                <input
                    className="input"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    required
                />
                <label className="input-label" htmlFor="query">
                    Message
                </label>
                <textarea
                    className="text-area"
                    id="query"
                    name="query"
                    value={query}
                    onChange={handleChange}
                    required
                />
                <button className="submit-button" type="submit">
                    {buttonText}
                </button>
            </form>
        </motion.div>
    );
};

export default ContactForm;
