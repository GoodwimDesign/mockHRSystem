const express = require('express');
const employeeJson = require('./data/employeeData');
const performanceReviewPhrasesJson = require('./data/performanceReviewPhrases');
const app = express();

app.get('/employees', (req, res) => res.status(200).send(employeeJson));
app.get('/performanceReviews', (req, res) => res.status(200).send(performanceReviewPhrasesJson));

module.exports = app;