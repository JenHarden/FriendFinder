// Dependencies

var path = require("path");

// Routing

module.exports = function (app) {

    // The route to the survey

    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    // If no matching route is found default to home
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};
