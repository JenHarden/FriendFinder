// Dependencies

var express = require("express");
var bodyParser = require("body-parser");

// Sets up the express app

var app = express();

// Sets the initial port
var PORT = process.env.PORT || 8080;

// BodyParser makes it possible for our server to interpret data sent to it

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Points the server to the route files

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Starts the server to begin listening

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});