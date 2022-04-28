const express = require("express");

const app = express()

app.post("/login", (req, res) => {
    res.send('')
})

module.exports.app = app
