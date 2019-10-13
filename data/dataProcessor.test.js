const getCombinedData = require('./dataProcessor');
const employeeJson = require('./employeeData');
const performanceReviewPhrasesJson = require('./performanceReviewPhrases');


describe('data processor', () => {
    describe('getCombinedData', () => {
        let reviewText;
        beforeEach(() => {
            reviewText = '';
        });

        describe('neutral results', () => {   
            test('are returned when sentiment is set to netural', () => {
                const expected = [{
                        reviewId: 1,
                        reviewDate: new Date('August 19, 1975').toString(),
                        reviewText: reviewText.concat(
                            performanceReviewPhrasesJson.positive[0],
                            ' ',
                            performanceReviewPhrasesJson.negative[0]
                        ),                            
                }];

                const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 1, 'neutral');

                expect(result[0].performanceReviews).toStrictEqual(expected);
            });

            test('for 1 employee by default', () => {
                const expected = [{
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
                    }]
                }];
                
                const result = getCombinedData(employeeJson, performanceReviewPhrasesJson);

                expect(result).toStrictEqual(expected);
            });

            test('for 20 employees', () => {
                const expected = [];
                
                for (var x = 0; x < 20; x++) {
                    expected.push({
                            employeeId: employeeJson[x].employeeId,
                            firstName: employeeJson[x].first_name,
                            lastName: employeeJson[x].last_name,
                            gender: employeeJson[x].gender,
                            race: employeeJson[x].race,
                            dob: employeeJson[x].age,
                            jobTitle: employeeJson[x].job_title,
                            department: employeeJson[x].department, 
                            performanceReviews: [{
                                reviewId: 1,
                                reviewDate: new Date('August 19, 1975').toString(),
                                reviewText: reviewText.concat(
                                        performanceReviewPhrasesJson.positive[x], 
                                        ' ',
                                        performanceReviewPhrasesJson.negative[x]
                                    ),                            
                            }]
                        }                   
                    )
                }
                
                const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 20);

                expect(result).toStrictEqual(expected);
            });
        });
        describe('positive results', () => {
            const sentiment = 'positive';

            test('are returned when sentiment is set to positive', () => {
                const expected = [{
                        reviewId: 1,
                        reviewDate: new Date('August 19, 1975').toString(),
                        reviewText: reviewText.concat(
                            performanceReviewPhrasesJson.positive[0],                            
                        ),                            
                }]

                const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 1, sentiment);

                expect(result[0].performanceReviews).toStrictEqual(expected);
            });

            test('for 1 employee by default', () => {
                const expected = [{
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
                    }]
                }]
            
            const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 1, sentiment);

            expect(result).toStrictEqual(expected);
            });
        });
        describe('negative results', () => {
            const sentiment = 'negative';

            test('are returned when sentiment is set to negative', () => {
                const expected = [{
                        reviewId: 1,
                        reviewDate: new Date('August 19, 1975').toString(),
                        reviewText: reviewText.concat(
                            performanceReviewPhrasesJson.negative[0],                            
                        ),                            
                    }]                
            
                const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 1, sentiment);

                expect(result[0].performanceReviews).toStrictEqual(expected);
            });

            test('for 1 employee by default', () => {
                const expected = [{
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
                    }]
                }]
            
            const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 1, sentiment);

            expect(result).toStrictEqual(expected);
            });
        });       
    });
});