// Require
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// initalize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Body parsing, Route and middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/api', apiRoutes);

app.use('/', htmlRoutes);

// Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/404.html'))
// );

// start the server on the port
app.listen(PORT, () => console.log(`This port is listening at ${PORT}`));