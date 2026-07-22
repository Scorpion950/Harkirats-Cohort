// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "change-me";

// Server port number 
const PORT = process.env.PORT || 3000;

// MongoDB connection URI 
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/course_selling_app";

// Export configuration constants for use in other files
module.exports = {
    JWT_SECRET,
    PORT,
    MONGO_URI
};