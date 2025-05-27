const { signup, login, getUserDetails } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { authorizeRole } = require('../Middlewares/RoleMiddleware');

const router = require('express').Router();

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/get-user',getUserDetails);

// Example: Protect a route for admins only
router.get('/admin', authorizeRole('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin', success: true });
});

module.exports = router;