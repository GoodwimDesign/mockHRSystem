const express = require('express');
const employeeJson = require('./data/employeeData');
const performanceReviewPhrasesJson = require('./data/performanceReviewPhrases');
const app = express();

app.get('/employees', (req, res) => res.status(200).send(employeeJson));

//TODO: change this route to performanceReviewPhrases
app.get('/performanceReviews', (req, res) => res.status(200).send(performanceReviewPhrasesJson));

//TODO: add /performanceReviews route for returning combined employeeId and performance review data

module.exports = app;