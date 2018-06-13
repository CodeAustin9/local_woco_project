var path = require("path");
var friendsArray = require('../data/search.js');
var db = require("../../models");

module.exports = function (app) {

    // display table data in json format
    app.get('/api/search', function (req, res) {
        res.json(friendsArray);

    });

    app.post('/api/search', function (req, res) {
        var singleInput = req.body;
        console.log(req.body);
        //  console.log('singleInput = ' + JSON.stringify(singleInput));

        var singleFeedback = singleInput.singleScores;
        // console.log('singleFeedback = ' + singleFeedback);

        // Compute best friend match
        var singleMatchName = '';
        var singleMatchPhoto = '';
        var singleEmail = "";
        var difference = Infinity;

        // Examine all existing friends in the list
        for (var i = 0; i < friendsArray.length; i++) {
            // console.log('friend = ' + JSON.stringify(friends[i]));

            // Compute differences for each question
            var diff = 0;
            for (var j = 0; j < singleFeedback.length; j++) {
                console.log(friendsArray[i].singleScores[j])
                console.log(singleFeedback[j])
                diff += Math.abs(friendsArray[i].singleScores[j] - singleFeedback[j]);
            }
            // console.log('diff = ' + diff);

            // If lowest difference, record the friend match
            if (diff < difference) {
                // console.log('Closest match found = ' + diff);
                // console.log('Friend name = ' + friends[i].name);
                // console.log('Friend image = ' + friends[i].photo);
                console.log("working");
                difference = diff;
                singleMatchName = friendsArray[i].singleName;
                singleMatchPhoto = friendsArray[i].singlePhoto;

            }
        }
        db.Date.create({
            singleName: req.body.singleName,
            singlePhoto: req.body.inglePhoto,
            singleEmail: req.body.singleEmail,
            singleScores: req.body.singleScores,
        
        })
            .then(function (dbPost) {
                console.log("hey dude the res redirect should be coing ")
                res.redirect("/search");
                
            })
            .catch(function (err) {
                
                console.log(err);
            })
    });
        


      
 
    app.post("/api/clear", function () {

        // Empty out the arrays of data
        friendsArray = [];


        console.log(friendsArray);
    });


// POST route for saving a new post
app.post("/api/rating", function (req, res) {
    console.log(req.body);
    db.Post.create({
        photo: req.body.photo,
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
        paid: req.body.paid,
        initiation: req.body.initiation,
        appearance: req.body.appearance,
        conversation: req.body.conversation,
        manners: req.body.manners,
        attraction: req.body.attraction,
        smoochable: req.body.smoochable,
        interaction: req.body.interaction,
        date: req.body.date,
        impression: req.body.impression,
    })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

};

