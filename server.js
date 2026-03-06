const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "service_db"
});

db.connect(function(err) {
    if (err) {
        console.log("Database error:", err);
    } else {
        console.log("Database connected");
    }
});

// Save order
app.post("/order", function(req, res) {

    const name = req.body.name;
    const service = req.body.service;
    const address = req.body.address;

    const sql = "INSERT INTO orders (name, service, address) VALUES (?, ?, ?)";

    db.query(sql, [name, service, address], function(err, result) {

        if (err) {
            console.log(err);
            res.send("Error saving order");
        } else {
            res.send("Order submitted successfully");
        }

    });

});

app.listen(3000, function() {
    console.log("Server running on http://localhost:3000");
});