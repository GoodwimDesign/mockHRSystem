const getCombinedData = function (employeeJson, phrasesJson, numberOfEmployees = 1) {
    const combinedData = [];
    let reviewText = '';
    
    for (let x = 0; x < numberOfEmployees; x++) {                
        combinedData.push({
                employeeId: employeeJson[x].employeeId,
                performanceReviews: [{
                    reviewId: 1,
                    reviewDate: new Date('August 19, 1975').toString(),
                    reviewText: reviewText.concat(
                            phrasesJson.positive[x],
                            ' ',
                            phrasesJson.negative[x]
                        ),          
                }]
            }
        );
    }
    
    return combinedData;
};

module.exports = getCombinedData;