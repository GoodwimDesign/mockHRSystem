const buildReviewText = function(index, reviewText, sentiment, phrasesJson) {
    if (sentiment === 'positive') {
        return reviewText.concat(phrasesJson.positive[index]);
    } else if (sentiment === 'negative'){
        return reviewText.concat(phrasesJson.negative[index]);
    } else {
        return reviewText.concat(
            phrasesJson.positive[index],
            ' ',
            phrasesJson.negative[index]
        )
    }
};

const getCombinedData = function (
    employeeJson, 
    phrasesJson, 
    numberOfEmployees = 1, 
    sentiment = 'neutral'
    ) {
    const combinedData = [];
    let reviewText = '';

    for (let x = 0; x < numberOfEmployees; x++) { 
        combinedData.push({
                employeeId: employeeJson[x].employeeId,
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
                    reviewText: buildReviewText(x, reviewText, sentiment, phrasesJson),          
                }]
            }
        );
    }
    
    return combinedData;
};

module.exports = getCombinedData;