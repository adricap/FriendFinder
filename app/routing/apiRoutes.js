var path = require("path");
var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        }

        var userData = req.body;
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScores = userData.scores;

        var scoreDifference = 0;

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            scoreDifference = 0;

            for (var j = 0; j < friends[i].scores[j]; j++) {

                scoreDifference += Math.abs(parseInt(friends[i].scores[j]) - parseInt(userScores[j]));

                if (scoreDifference <= bestMatch.friendDifference) {

                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = scoreDifference;
                }
            }
        }

        friends.push(userData);

        res.json(bestMatch);

    })

};