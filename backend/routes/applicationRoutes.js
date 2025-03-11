const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Applicant = require("../models/applicant");//capital A used previously
const extractCVData = require("../utils/extractCV");
const uploadFile = require("../utils/uploadToCloud");
const sendWebhook = require("../utils/sendWebhook");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
    res.send("Application Routes Working!");
});

router.post("/apply", upload.single("cv"), async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const filePath = req.file.path;
        const cloudLink = await uploadFile(filePath, req.file.filename);
        const extractedData = await extractCVData(filePath);

        const applicant = new Applicant({
            name,
            email,
            phone,
            cvPublicLink: cloudLink,
            ...extractedData,
            processed: true,
            processedAt: new Date()
        });
        await applicant.save();

        await sendWebhook({ cv_data: { ...extractedData, cv_public_link: cloudLink }, metadata: { applicant_name: name, email, status: "testing", cv_processed: true, processed_timestamp: new Date() } }, email);
        await sendEmail(email, "Your CV is under review", "We have received your CV. We will update you soon!");

        res.status(200).json({ success: true, message: "Application received" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
