const getCombinedData = function (employeeJson, phrasesJson, numberOfEmployees = 2) {
    const combinedData = [];
    
    for (let x = 0; x < numberOfEmployees; x++) {
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