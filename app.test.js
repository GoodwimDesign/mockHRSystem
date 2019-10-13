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
    describe('performanceReview GET returns', () => {
        let reviewText = '';
        const performanceReviews = [{
            employeeId: employeeJson[0].employeeId,
            firstName: employeeJson[0].first_name,
            lastName: employeeJson[0].last_name,
            gender: employeeJson[0].gender,
            race: employeeJson[0].race,
            dob: employeeJson[0].age,
            jobTitle: employeeJson[0].job_title,
            department: employeeJson[0].department, 
            performanceReviews: [{
                reviewId: 1,
                reviewDate: new Date('August 19, 1975').toString(),
                reviewText: reviewText.concat(
                    performanceReviewPhrasesJson.positive[0],
                    ' ',
                    performanceReviewPhrasesJson.negative[0]
                ),            
            }],
        }];

        test('status code 200', () => {
            return request(app)
            .get('/performanceReviews')
            .then(response => {
                expect(response.status).toBe(200);
            });
        });

        describe('performance reviews data', () => {     
            test('for 1 employees by default', async () => {            
                return request(app)
                .get('/performanceReviews')
                .then(response => {
                    expect(response.body).toStrictEqual(performanceReviews);
                });
            });

            test('for number of employees specified by the query param', async () => {
                performanceReviews.push(
                    {
                        employeeId: 2,
                        firstName: employeeJson[1].first_name,
                        lastName: employeeJson[1].last_name,
                        gender: employeeJson[1].gender,
                        race: employeeJson[1].race,
                        dob: employeeJson[1].age,
                        jobTitle: employeeJson[1].job_title,
                        department: employeeJson[1].department, 
                        performanceReviews: [{
                            reviewId: 1,
                            reviewDate: new Date('August 19, 1975').toString(),
                            reviewText: reviewText.concat(
                                performanceReviewPhrasesJson.positive[1],
                                ' ',
                                performanceReviewPhrasesJson.negative[1],
                            ),            
                        }],
                    },
                    {
                        employeeId: 3,
                        firstName: employeeJson[2].first_name,
                        lastName: employeeJson[2].last_name,
                        gender: employeeJson[2].gender,
                        race: employeeJson[2].race,
                        dob: employeeJson[2].age,
                        jobTitle: employeeJson[2].job_title,
                        department: employeeJson[2].department, 
                        performanceReviews: [{
                            reviewId: 1,
                            reviewDate: new Date('August 19, 1975').toString(),
                            reviewText: reviewText.concat(
                                performanceReviewPhrasesJson.positive[2],
                                ' ',
                                performanceReviewPhrasesJson.negative[2],
                            ),            
                        }],
                    },
                )
                            
                return request(app)
                .get('/performanceReviews?numberOfEmployees=3')
                .then(response => {
                    expect(response.body).toStrictEqual(performanceReviews);
                });
            });

            test('with a positive sentiment with a query param', async () => {
                const positivePerformanceReview = [{
                    employeeId: employeeJson[0].employeeId,
                    firstName: employeeJson[0].first_name,
                    lastName: employeeJson[0].last_name,
                    gender: employeeJson[0].gender,
                    race: employeeJson[0].race,
                    dob: employeeJson[0].age,
                    jobTitle: employeeJson[0].job_title,
                    department: employeeJson[0].department, 
                    performanceReviews: [{
                        reviewId: 1,
                        reviewDate: new Date('August 19, 1975').toString(),
                        reviewText: reviewText.concat(
                            performanceReviewPhrasesJson.positive[0],
                        ),            
                    }],
                }];

                return request(app)
                .get('/performanceReviews?sentiment=positive')
                .then(response => {
                    expect(response.body).toStrictEqual(positivePerformanceReview);
                });
            });

            test('with a negative sentiment with a query param', async () => {
                const negativePerformanceReview = [{
                    employeeId: employeeJson[0].employeeId,
                    firstName: employeeJson[0].first_name,
                    lastName: employeeJson[0].last_name,
                    gender: employeeJson[0].gender,
                    race: employeeJson[0].race,
                    dob: employeeJson[0].age,
                    jobTitle: employeeJson[0].job_title,
                    department: employeeJson[0].department, 
                    performanceReviews: [{
                        reviewId: 1,
                        reviewDate: new Date('August 19, 1975').toString(),
                        reviewText: reviewText.concat(
                            performanceReviewPhrasesJson.negative[0],
                        ),            
                    }],
                }];

                return request(app)
                .get('/performanceReviews?sentiment=negative')
                .then(response => {
                    expect(response.body).toStrictEqual(negativePerformanceReview);
                });
            });

            test('with results of multiple query params', async () => {
                const multipleQueryParamPerformanceReviews = [
                    {
                        employeeId: 1,
                        firstName: employeeJson[0].first_name,
                        lastName: employeeJson[0].last_name,
                        gender: employeeJson[0].gender,
                        race: employeeJson[0].race,
                        dob: employeeJson[0].age,
                        jobTitle: employeeJson[0].job_title,
                        department: employeeJson[0].department, 
                        performanceReviews: [{
                            reviewId: 1,
                            reviewDate: new Date('August 19, 1975').toString(),
                            reviewText: reviewText.concat(
                                performanceReviewPhrasesJson.positive[0],
                            ),            
                        }],
                    },
                    {
                        employeeId: 2,
                        firstName: employeeJson[1].first_name,
                        lastName: employeeJson[1].last_name,
                        gender: employeeJson[1].gender,
                        race: employeeJson[1].race,
                        dob: employeeJson[1].age,
                        jobTitle: employeeJson[1].job_title,
                        department: employeeJson[1].department, 
                        performanceReviews: [{
                            reviewId: 1,
                            reviewDate: new Date('August 19, 1975').toString(),
                            reviewText: reviewText.concat(
                                performanceReviewPhrasesJson.positive[1],
                            ),            
                        }],
                    },
                    {
                        employeeId: 3,
                        firstName: employeeJson[2].first_name,
                        lastName: employeeJson[2].last_name,
                        gender: employeeJson[2].gender,
                        race: employeeJson[2].race,
                        dob: employeeJson[2].age,
                        jobTitle: employeeJson[2].job_title,
                        department: employeeJson[2].department, 
                        performanceReviews: [{
                            reviewId: 1,
                            reviewDate: new Date('August 19, 1975').toString(),
                            reviewText: reviewText.concat(
                                performanceReviewPhrasesJson.positive[2],
                            ),            
                        }],
                    },
                ]

                return request(app)
                .get('/performanceReviews?sentiment=positive&numberOfEmployees=3')
                .then(response => {
                    expect(response.body).toStrictEqual(multipleQueryParamPerformanceReviews);
                });
            });
        });
    });
});