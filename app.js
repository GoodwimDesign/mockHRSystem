const express = require('express');
const employeeJson = require('./data/employeeData');
const app = express();

app.get('/employees', (req, res) => res.send(employeeJson));

module.exports = app;