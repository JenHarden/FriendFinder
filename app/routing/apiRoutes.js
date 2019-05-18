// Load data

var userData = require("../data/friends");

// Routing

module.exports = function (app) {
    // API GET request

    app.get("/api/friends", function (req, res) {
        res.json(userData);
    });

    var comparisonUserTotalScore = 0;

    var friendScores = [];


    // API POST request

    app.post("/api/friends", function (req, res) {

        // Stores the current user scores in array

        var currentUserScores = req.body.scores;

        console.log("Current score: " + currentUserScores);

        // Determine the most compatible friend

        for (var i = 0; i < userData.length; i++) {

            // Converts each user's results into an array of numbers

            var comparisonUserScores = userData[i].scores;

            // Find total difference between current user and potential friends

            comparisonUserTotalScore = calculateUserCompatibilityScore(currentUserScores, comparisonUserScores);

            // Build the array of user compatibility scores

            friendScores.push(comparisonUserTotalScore);

        }

        console.log("Friend scores: " + friendScores);

        var index = 0;
        var value = friendScores[0];

        // Need the index of lowest score

        for (var i = 0; i < friendScores.length; i++) {
            console.log("Value of item in array: " + friendScores[i]);
            if (friendScores[i] < value) {
                value = friendScores[i];
                index = i;
            }
        }

        // Results the best friend

        console.log("Best friend's name: " + userData[index].name);

        // Send best friend as a response so it can be displayed in modal

        res.send(userData[index]);

        // Push new user to user array
        userData.push(req.body);

    });
};

var totalDifference = 0;

// Total difference between current user and another user
function calculateUserCompatibilityScore(currentUserScores, comparisonUserScores) {

    // Reset the total difference counter each time the function is called
    totalDifference = 0;

    for (var i = 0; i < currentUserScores.length; i++) {

        totalDifference += Math.abs(currentUserScores[i] - comparisonUserScores[i]);
    }

    console.log("Final total difference for friend: " + totalDifference);

    return totalDifference;
};