const request = require('supertest');
const app = require('./app');
const employeeJson = require('./data/employeeData');
const performanceReviewPhrasesJson = require('./data/performanceReviewPhrases');

describe('mockHRSystem', () => {
    describe('employees GET', () => {
        test('returns employee JSON', () => {
            return request(app)
            .get('/employees')
            .then(response => {
                expect(response.body).toStrictEqual(employeeJson);
            });
        });
        test('returns status code 200', () => {
            return request(app)
            .get('/employees')
            .then(response => {
                expect(response.status).toBe(200);
            });
        });
    });
    describe('performanceReviewPhrases GET', () => {
        test('returns performance reviews JSON', () => {
            return request(app)
            .get('/performanceReviewPhrases')
            .then(response => {
                expect(response.body).toStrictEqual(performanceReviewPhrasesJson);
            });
        });
        test('returns status code 200', () => {
            return request(app)
            .get('/performanceReviewPhrases')
            .then(response => {
                expect(response.status).toBe(200);
            });
        });
    });
    describe('performanceReview GET', () => {
        const performanceReviews = [{
            employeeId: employeeJson[0].employeeId,
            performanceReviews: {
                positive: performanceReviewPhrasesJson.positive[0],
                negative: performanceReviewPhrasesJson.negative[0],
            }
        },
        {
            employeeId: employeeJson[1].employeeId,
            performanceReviews: {
                positive: performanceReviewPhrasesJson.positive[1],
                negative: performanceReviewPhrasesJson.negative[1],
            }
        },
    ]
        test('returns performance reviews data for 2 employees by default', () => {            
            return request(app)
            .get('/performanceReviews')
            .then(response => {
                expect(response.body).toStrictEqual(performanceReviews);
            });
        });
        test('returns performance reviews data for number of employees specified by the query string', () => {
            const threePerformanceReviews = [
                ...performanceReviews,
                {
                    employeeId: employeeJson[2].employeeId,
                    performanceReviews: {
                        positive: performanceReviewPhrasesJson.positive[2],
                        negative: performanceReviewPhrasesJson.negative[2],
                    }
                }
            ]            
            return request(app)
            .get('/performanceReviews?numberOfEmployees=3')
            .then(response => {
                expect(response.body).toStrictEqual(threePerformanceReviews);
            });
        });
        test('returns status code 200', () => {
            return request(app)
            .get('/performanceReviews')
            .then(response => {
                expect(response.status).toBe(200);
            });
        });
    });
});