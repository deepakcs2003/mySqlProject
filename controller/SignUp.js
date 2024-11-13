// controller/SignUp.js
const connection = require('../config/db');  // Import the correct connection object

const signup = async (req, res) => {
    try {
        const { name, pass, email, role } = req.body;  // Destructure the data from req.body

        // Use parameterized queries to prevent SQL injection
        var sql = "INSERT INTO SignUpTable (name, pass, email, role) VALUES (?, ?, ?, ?)";

        // Use connection.query instead of db.query
        connection.query(sql, [name, pass, email, role], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            return res.status(200).json({
                message: "User signed up successfully",
                success: true,
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "An error occurred",
            success: false,
            error: err.message,
        });
    }
};

module.exports = signup;
