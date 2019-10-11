var getCombinedData = function (employeeJson, phrasesJson, numberOfEmployees) {
    const combinedData = [];
    
    for (var x = 0; x < numberOfEmployees; x++) {
        combinedData.push({
                employeeId: employeeJson[x].employeeId,
                performanceReviews: {
                    positive: phrasesJson.positive[x],
                    negative: phrasesJson.negative[x]
                }
            }
        );
    }

    return combinedData;
};

module.exports = getCombinedData;