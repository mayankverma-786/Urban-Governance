const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', // Default to 'user' if no role is provided
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        const errormsg = 'Authentication failed email or password is wrong';
        if (!user) {
            return res.status(403).json({ message: errormsg, success: false });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: errormsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, id: user._id, role: user.role }, // Include role
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: 'Login successful', success: true, jwtToken, email, name: user.name, role: user.role });
    } catch (err) {
        console.log('Login Error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};
const getUserDetails = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token
  
      if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
      }
  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Get the user from DB
      const user = await UserModel.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send user details
      res.status(200).json({
        message: 'JWT verified successfully',
        success: true,
        email: user.email,
        name: user.name,
        role: user.role,
      });
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Internal server error', success: false });
    }
  };

module.exports = {
    signup,
    login,
    getUserDetails
};