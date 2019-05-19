// Load data

var friends = require("../data/friends");

// Routing

module.exports = function (app) {
    // API GET request

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    var comparisonTotalScore = 0;

    var friendScores = [];


    // API POST request

    app.post("/api/friends", function (req, res) {

        // Stores the current user scores in array

        var surveyResults = req.body.scores;

        // Determine the most compatible friend

        for (var i = 0; i < friends.length; i++) {

            // Converts each user's results into an array of numbers

            var comparisonScore = friends[i].scores;

            // Find total difference between current user and potential friends

            comparisonTotalScore = calculateUserCompatibilityScore(surveyResults, comparisonScore);

            // Build the array of user compatibility scores

            friendScores.push(comparisonTotalScore);

        }

        var index = 0;
        var value = friendScores[0];

        // Need the index of lowest score

        for (var i = 0; i < friendScores.length; i++) {
            if (friendScores[i] < value) {
                value = friendScores[i];
                index = i;
            }
        }

        // Results the best friend

        console.log("Best friend's name: " + friends[index].name);

        // Send best friend as a response so it can be displayed in modal

        res.send(friends[index]);

        // Push new user to user array
        friends.push(req.body);

    });
};

var totalDifference = 0;

// Total difference between current user and another user
function calculateUserCompatibilityScore(surveyResults, comparisonScore) {

    // Reset the total difference counter each time the function is called
    totalDifference = 0;

    for (var i = 0; i < surveyResults.length; i++) {

        totalDifference += Math.abs(surveyResults[i] - comparisonScore[i]);
    }

    return totalDifference;
};