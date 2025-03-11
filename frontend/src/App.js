import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', cv: null });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setFormData({ ...formData, cv: e.target.files[0] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('cv', formData.cv);

        try {
            await axios.post('http://localhost:5000/apply', formDataToSend);
            alert('Application submitted successfully!');
        } catch (error) {
            alert('Error submitting application');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Job Application Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default App;
