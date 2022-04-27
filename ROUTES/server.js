// Require
const express = require('express');
const apiRoutes = require('../ROUTES/apiRoutes');
const htmlRoutes = require('../ROUTES/htmlRoutes');

// initalize the app and create a port
const app = require('express');
const PORT = process.env.PORT || 3001;

// Body parsing, Route and middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// start the server on the port
app.listen(PORT, () => console.log(`This port is listening at ${PORT}`));