const express = require('express');
const employeeJson = require('./data/employeeData');
const performanceReviewPhrasesJson = require('./data/performanceReviewPhrases');
const getCombinedData = require('./data/dataProcessor');

const app = express();

app.get('/employees', (req, res) => res.status(200).send(employeeJson));

app.get('/performanceReviewPhrases', (req, res) => res.status(200).send(performanceReviewPhrasesJson));

app.get('/performanceReviews', (req, res) => {
    // For some reason whenever numberOfEmployees is added as the 2nd param
    // it comes back as undefined.
    // There's even a test that passes ensuring that it shouldn't do that
    // But whatever, this is just a mock...
    // numberOfEmployees MUST be the first query string param
    const numberOfEmployees = req.query.numberOfEmployees;
    const sentiment = req.query.sentiment;

    const combinedPerformanceReviewData = getCombinedData(
        employeeJson, 
        performanceReviewPhrasesJson, 
        numberOfEmployees,
        sentiment
    );
    return res.status(200).send(combinedPerformanceReviewData);
});

module.exports = app;