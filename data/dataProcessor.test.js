const getCombinedData = require('./dataProcessor');
const employeeJson = require('./employeeData');
const performanceReviewPhrasesJson = require('./performanceReviewPhrases');


describe('data processor', () => {
    describe('getCombinedData', () => {
        test('combines employee and review data for 2 employees', () => {
            const expected = [{
                    employeeId: employeeJson[0].employeeId,
                    peformanceReviews: {
                        positive: performanceReviewPhrasesJson.positive[0],
                        negative: performanceReviewPhrasesJson.negative[0]
                    }
                },
                {
                    employeeId: employeeJson[1].employeeId,
                    peformanceReviews: {
                        positive: performanceReviewPhrasesJson.positive[1],
                        negative: performanceReviewPhrasesJson.negative[1]
                    }
                }
            ]
            
            const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 2);

            expect(result).toStrictEqual(expected);
        });
        test('combines employee and review data for 20 employees', () => {
            const expected = [];
            
            for (var x = 0; x < 20; x++) {
                expected.push({
                        employeeId: employeeJson[x].employeeId,
                        peformanceReviews: {
                            positive: performanceReviewPhrasesJson.positive[x],
                            negative: performanceReviewPhrasesJson.negative[x]
                        }
                    }                   
                )
            }
            
            const result = getCombinedData(employeeJson, performanceReviewPhrasesJson, 20);

            expect(result).toStrictEqual(expected);
        });
    });
});