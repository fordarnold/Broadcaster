// import the Express framework
const express = require("express");
// // import joi, data validation library for JS
// const joi = require('joi');
// // import app routes
// import v1Routes from './v1/routes/appRoutes';

// create the Express app server
const app = express();
// specify the server port
const PORT = process.env.PORT || 3000;

// starting (landing) endpoint
// app.get('/', (req, res) => {
//     res.send('Welcome to Broadcaster API Server');
// });
app.get('/', (req, res) => {
    res.status(200).json({ 
    	status: 200,
    	message: 'Broadcaster API Server welcomes you!'
    });
});

// start the server, on specified port
app.listen(PORT, () => console.log(`Broadcaster API Server is listening on port ${PORT} ...`));