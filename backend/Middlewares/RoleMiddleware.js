const jwt = require('jsonwebtoken');

const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; // Extract token from header
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Access denied', success: false });
            }

            req.user = decoded; // Attach user info to the request
            next();
        } catch (err) {
            console.log('Authorization Error:', err);
            res.status(401).json({ message: 'Unauthorized', success: false });
        }
    };
};

module.exports = { authorizeRole };