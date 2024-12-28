const express = require('express');
const router = express.Router();
const FormSubmission = require('./FormSubmission');

// Endpoint to handle form submissions
router.post('/submit', async (req, res) => {
    try {
        const { username, email, phonenumber, qualification, message } = req.body;

        const submission = new FormSubmission({
            username,
            email,
            phonenumber,
            qualification,
            message,
        });

        await submission.save();
        res.status(201).json({ success: true, message: 'Submission received!' });
    } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ success: false, message: 'Error saving submission' });
    }
});

// Endpoint to fetch all form submissions
router.get('/form-data', async (req, res) => {
    try {
        const submissions = await FormSubmission.find(); // Fetch all submissions
        console.log('Fetched submissions:', submissions); // Log the submissions
        res.status(200).json(submissions); // Send the submissions as an array
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ success: false, message: 'Error fetching submissions' });
    }
});

module.exports = router;
