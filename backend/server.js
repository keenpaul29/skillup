const express = require('express');
// Import the routes
const mongoose = require('mongoose');
const FormSubmission = require('./FormSubmission');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
  try {
    const formData = new FormSubmission(req.body);
    await formData.save();
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error submitting form', error });
  }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
})

// Sample endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Skillup API!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});