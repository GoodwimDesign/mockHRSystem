const getCombinedData = function (employeeJson, phrasesJson, numberOfEmployees = 1, sentiment = 'neutral') {
    const combinedData = [];
    let reviewText = '';

    const buildReviewText = function(index) {
        if (sentiment === 'positive') {
            return reviewText.concat(phrasesJson.positive[index]);
        } else {
            return reviewText.concat(
                phrasesJson.positive[index],
                ' ',
                phrasesJson.negative[index]
            )
        }
    };
    
    for (let x = 0; x < numberOfEmployees; x++) {                
        combinedData.push({
                employeeId: employeeJson[x].employeeId,
                performanceReviews: [{
                    reviewId: 1,
                    reviewDate: new Date('August 19, 1975').toString(),
                    reviewText: buildReviewText(x),          
                }]
            }
        );
    }
    
    return combinedData;
};

module.exports = getCombinedData;