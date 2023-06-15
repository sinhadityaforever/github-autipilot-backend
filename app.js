// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Set up additional security headers using Helmet
app.use(helmet());

// Connect to MongoDB
require('./db');

// Import routes
const testRoutes = require('./routes/test.routes');
const authRoutes = require('./routes/auth.routes');

// Register routes
app.use('/test', testRoutes);
app.use('/auth', authRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
