const express = require('express');
const employeeJson = require('./data/employeeData');
const performanceReviewPhrasesJson = require('./data/performanceReviewPhrases');
const getCombinedData = require('./data/dataProcessor');

const app = express();

app.get('/employees', (req, res) => res.status(200).send(employeeJson));

app.get('/performanceReviewPhrases', (req, res) => res.status(200).send(performanceReviewPhrasesJson));

app.get('/performanceReviews', (req, res) => {
    const combinedPerformanceReviewData = getCombinedData(employeeJson, performanceReviewPhrasesJson, 2);
    return res.status(200).send(combinedPerformanceReviewData);
});

module.exports = app;