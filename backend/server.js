const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const User = require('./User'); // Import the User model

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Express error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Define the form submission schema
const formSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    qualification: { type: String, required: true },
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const FormSubmission = mongoose.model('FormSubmission', formSchema);

// Form submission endpoint
app.post('/submit', async (req, res) => {
    try {
        console.log('Received form submission:', req.body);
        
        // Validate required fields
        const { username, email, phonenumber, qualification } = req.body;
        if (!username || !email || !phonenumber || !qualification) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: { username, email, phonenumber, qualification }
            });
        }

        const formData = new FormSubmission(req.body);
        await formData.save();
        
        console.log('Form saved successfully:', formData);
        res.status(201).json({ 
            message: 'Form submitted successfully',
            data: formData
        });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ 
            error: 'Failed to submit form',
            details: error.message
        });
    }
});

// Get all form submissions
app.get('/api/form-data-all', async (req, res) => {
    try {
        const formData = await FormSubmission.find().sort({ createdAt: -1 });
        res.json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ error: 'Failed to fetch form data' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.get("/", (req, res) => {
    res.json({ message: 'Welcome to the Skillup API!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
