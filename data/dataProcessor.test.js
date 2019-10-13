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
                    employeeId: employeeJson[0].employeeId,                     
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

                const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 1, 'neutral');

                expect(result).toStrictEqual(expected);
            });

            test('for 1 employee by default', () => {
                const expected = [{
                    employeeId: employeeJson[0].employeeId,                     
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

            test('combines employee and review data for 20 employees', () => {
                const expected = [];
                
                for (var x = 0; x < 20; x++) {
                    expected.push({
                            employeeId: employeeJson[x].employeeId,                         
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
                    employeeId: employeeJson[0].employeeId,                     
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

            test('for 1 employee by default', () => {
                const expected = [{
                    employeeId: employeeJson[0].employeeId,                     
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
    });
});