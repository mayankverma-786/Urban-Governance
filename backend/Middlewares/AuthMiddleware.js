const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Log the Authorization header
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

        // Log the decoded token
        console.log('Decoded Token:', decoded);

        req.user = decoded; // Attach user info to the request
        next();
    } catch (err) {
        console.log('Authentication Error:', err);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { authenticateUser };