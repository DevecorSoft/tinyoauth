const express = require("express");

const app = express()

app.get("/health-check", (req, res) => res.json({message: "Welcome to the project!"}));

app.post("/login", (req, res) => {
    res.send('')
})

module.exports.app = app
