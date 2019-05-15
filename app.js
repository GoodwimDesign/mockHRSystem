const express = require('express')
const employeeJson = require('./data/employeeData')
const app = express()
const port = 3000;

app.get('/employees', (req, res) => res.send(employeeJson));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))