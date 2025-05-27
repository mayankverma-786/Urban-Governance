const Issue = require('../Models/Issue'); 

const createIssue = async (req, res) => {
    try {
        console.log('createIssue called');
        if (!req.user) {
            console.error('Unauthorized: req.user is undefined');
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }
        
        const { title, description,summery, category, location } = req.body;
        console.log('Request body:', { title, description,summery, category, location });

        // Handle single image file from the front-end
        const imageFile = req.file; // Single file object
        console.log('Uploaded file:', imageFile ? imageFile.filename : 'No file uploaded');

        const imageFileNames = imageFile ? [imageFile.filename] : [];

        const issue = new Issue({
            title,
            description,
            summery,
            category,
            location,
            images: imageFileNames, // Save an array of image filenames
            reportedBy: req.user.id, 
        });

        await issue.save();
        console.log('Issue saved successfully:', issue._id);
        res.status(201).json({ message: "Your report has been successfully filed. We'll take it from here!", issue });
    } catch (err) {
        console.log('Error creating issue:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getIssues = async (req, res) => {
    const userId = req.user.id;  // Make sure to get the userId from the authenticated user

    try {
        // Get issues reported by the user
        const issues = await Issue.find({ reportedBy: userId })
            .populate('reportedBy', 'name _id'); // Optionally populate user info

        // Map through issues to include the image URL if available
        const updatedIssues = issues.map(issue => ({
            ...issue._doc, // Copy the issue document
            images: issue.images || [],
            imageURLs: issue.images ? issue.images.map(filename => `${process.env.BASE_URL || 'http://localhost:4000'}/file/${filename}`) : [],
        }));

        res.status(200).json(updatedIssues);
    } catch (err) {
        console.error('Error fetching issues:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createIssue, getIssues };
