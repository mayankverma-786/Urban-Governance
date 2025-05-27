const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
const AuthRouter = require('./Routes/AuthRouter.js');
const IssueRouter = require('./Routes/IssueRouter');
const FileRouter = require('./Routes/uploadRouter.js');
const { mapRouter } = require('./Routes/map.route.js');


require('dotenv').config();
require('./Models/db.js');

// Middleware
app.use(cors());
app.use(bodyParser.json());
 // Use built-in JSON parser

// Add the issue routes
app.use('/issue', IssueRouter);

// Add the file routes
app.use('/file', FileRouter);

// Routes
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.use('/auth', AuthRouter);
app.use('/api',mapRouter);
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
