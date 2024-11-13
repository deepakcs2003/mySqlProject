const connection = require("../config/db");
const jwt = require('jsonwebtoken'); // Import jwt module
require("dotenv").config();

const logIn = async (req, res) => {
    try {
        // Destructure the data from req.body
        const { email, pass, role } = req.body;

        // SQL query to check if the user exists with the provided email, password, and role
        const sql = "SELECT * FROM SignUpTable WHERE email = ? AND pass = ? AND role = ?";

        // Execute the query with the values
        connection.query(sql, [email, pass, role], (err, result) => {
            if (err) {
                // If there's an error during the query execution
                return res.status(500).json({
                    message: "An error occurred during login",
                    success: false,
                    error: err.message
                });
            }

            if (result.length > 0) {
                // If a matching user is found
                const user = result[0]; // Get the first matching user

                // Create JWT payload including the user's role and id
                const payload = {
                    email: user.email,
                    id: user.id, // Assuming `id` is used to identify the user in your database
                    role: user.role // Include the role in the payload
                };

                // Sign the JWT with a secret key and an expiration time (e.g., 30 days)
                const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "30d" });

                // Set the token as a cookie and respond with success
                res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).status(200).json({
                    success: true,
                    message: "Login Successful",
                    token: token, // Include the token in the response body
                    role: user.role, // Optionally include role in response
                    error: false,
                });
            } else {
                // If no matching user is found
                return res.status(401).json({
                    message: "Invalid email, password, or role",
                    success: false
                });
            }
        });

    } catch (err) {
        // Catch and return any unexpected errors
        return res.status(500).json({
            message: "Error during login",
            error: err.message,
            success: false,
        });
    }
};

module.exports = logIn;
