// import the Express framework
const express = require("express");
// create the Express app
const app = express();
// specify our port
const PORT = process.env.PORT || 3000;

// default endpoint
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
app.listen(PORT, () => console.log(`Broadcaster API Server is listening on port ${PORT} ...`))