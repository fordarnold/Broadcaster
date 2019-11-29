import express from "express"; // Express web framework
import bodyParser from "body-parser"; // Handle HTTP POST requests with 'req.body' in Express framework (~https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express)
// const joi = require('joi'); // Data validation library for JS

import routes from "./routes/routes.v1"; // Import API routes (v1)

const app = express(); // Create the Express app server
const PORT = process.env.PORT || 3000; // Specify the server port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets/uploads', express.static('uploads'));

/**
 * COMMON API ROUTES & END-POINTS
 * -------------------------------------------------------------------
 */

// app.use(routes);

// Default (landing) route
app.get('/', (req, res) => {

    res.status(200).json({ 
    	status: 200,
    	message: "Broadcaster API Server welcomes you!"
    });
    
});

// 404 error (missing) route
app.use((req, res) => {

    res.status(404).json({ 
    	status: 404,
    	error: "API endpoint was not found" 
    });

});

// start the server, on specified port
const server = app.listen(PORT, () => console.log(`Broadcaster API Server is listening on port ${PORT} ...`));

export default server;