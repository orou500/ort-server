const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const greetingRoutes = require('./routes/greeting');
const countRoutes = require('./routes/count');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/greeting', greetingRoutes);
app.use('/count', countRoutes);

module.exports = app;
