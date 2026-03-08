const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Database connection - commented out for now
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "service_db"
// });

// db.connect(function(err) {
//     if (err) {
//         console.log("Database error:", err);
//     } else {
//         console.log("Database connected");
//     }
// });

// Save order - mock implementation
app.post("/order", function(req, res) {

    const name = req.body.name;
    const service = req.body.service;
    const address = req.body.address;

    console.log("Order received:", { name, service, address });

    // Mock response
    res.send("Order submitted successfully");

});

app.listen(3000, function() {
    console.log("Server running on http://localhost:3000");
});