require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schema
const ApplicantSchema = new mongoose.Schema({
    name: String, email: String, phone: String,
    cvPublicLink: String, education: String, qualifications: String, projects: String,
    status: String, processed_timestamp: String
});
const Applicant = mongoose.model('Applicant', ApplicantSchema);

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Route: Upload CV & Process Data
app.post('/apply', upload.single('cv'), async (req, res) => {
    const { name, email, phone } = req.body;

    const newApplicant = new Applicant({
        name, email, phone,
        cvPublicLink: `http://localhost:5000/uploads/${req.file.filename}`,
        education: "Bachelor's in CS",
        qualifications: "AWS Certified",
        projects: "Portfolio, AI Chatbot",
        status: "testing",
        processed_timestamp: new Date().toISOString()
    });

    await newApplicant.save();
    await axios.post('https://rnd-assignment.automations-3d6.workers.dev/', {
        cv_data: { name, email, education: "Bachelor's in CS", qualifications: "AWS Certified", projects: "Portfolio, AI Chatbot" },
        metadata: { applicant_name: name, email: email, status: "testing", cv_processed: true, processed_timestamp: new Date().toISOString() }
    }, { headers: { 'X-Candidate-Email': email } });

    res.json({ message: "Application received!", data: newApplicant });
});

// Start Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
