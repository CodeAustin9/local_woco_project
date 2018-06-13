var path = require("path");
var friendsArray = require('../data/search.js');
var db = require("../../models");

module.exports = function (app) {

    // display table data in json format
    app.get('/api/search', function (req, res) {
        res.json(friendsArray);

    });

    



    app.get('/api/search', function (req, res) {

        // Display mentors data in json format
        res.json(friendsArray);
    });

    app.post('/api/search', function (req, res) {
        var userInput = req.body;
        console.log(userInput)
        var dateMatch = {
            singleName: "",
            singlePhoto: "",
            singleEmail: "",
            singleScores: 1000
        }
        //===========================================================================

        db.Dates.findAll({})
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    console.log(`======================= friend name: ${data[i].singleName}`)
                    console.log("userInput: " + userInput[i]);
                    
                    
                    var diff = Math.abs(userInput[i].singleScores - data[i].singleScores)
                    console.log("Diff: " + diff);
                    if (diff < dateMatch.singleScores) {
                        dateMatch.singleName = friend.singleName;
                        dateMatch.singlePhoto = friend.singlePhoto;
                        dateMatch.singleEmail = friend.singleEmail;
                        dateMatch.singleScores = diff;
                    }
                }
                res.json(dateMatch)
                // loop over the data and compare the scores in data with the userInput score
            })
            .catch(err => {
                console.log(err)
            })
            //=============================================================================
            var scoresString = req.body.singleScores.join("");
            console.log("string: " + scoresString)
            db.Dates.create({
                singleName: req.body.singleName,
                singlePhoto: req.body.singlePhoto,
                singleEmail: req.body.singleEmail,
                singleScores: scoresString,
            
            })
                .then(function (dbPost) {
                    console.log(dbPost);
                    console.log("==================== hey dude the res redirect should be coing ")
                    res.end();
                    // res.redirect("/search");
                    // res.json(dbPost); 
                })
                .catch(function (err) {
                    
                    console.log(err);
                })
       
        // Check newMentorPoints and compare it to mentorData 

        // var newMentorPoints = userInput.scores;
        // var sameName = '';
        // var sameEmail = "";
        // var samePicture = '';
        // var mentorGap = 5000;

        // // Loop through mentor list
        // for (var i = 0; i < mentorsData.length; i++) {

        //     // Check gap in points to compare mentors in list
        //     var gap = 0;
        //     for (var j = 0; j < newMentorPoints.length; j++) {
        //         gap += (Math.abs(parseInt(mentorsData[i].scores[j]) - parseInt(userInput.scores[j])));
        //     }

        //     // If difference in score is low, then a match is found
        //     if (gap < mentorGap) {
        //         // console.log("Found your mentor = " + gap);
        //         // console.log("Mentor's name = " + mentorsData[i].name);
        //         // console.log("Mentor's email = " + mentorsData[i].email);
        //         // console.log("Mentor's image = " + mentorsData[i].photo);

        //         // Create new mentor
        //         mentorGap = gap;
        //         sameName = mentorsData[i].name;
        //         sameEmail = mentorsData[i].email;
        //         samePicture = mentorsData[i].photo;
        //     }
        // }

        // Add new user
        friendsArray.push(userInput);
        // db.Dates.create(userInput)
        //     .then(data => {
        //         console.log("from .then", data.dataValues.scores)
        //     })
        //     .catch(err => console.log(err))
        // Sending object sameName and samePicture to backend
        // Sending response back to mentors-survey.html


        // res.json({ sameName: sameName, sameEmail: sameEmail, samePicture: samePicture });
    });




        // Examine all existing friends in the list
        // for (var i = 0; i < friendsArray.length; i++) {
        //     // console.log('friend = ' + JSON.stringify(friends[i]));

        //     // Compute differences for each question
        //     var diff = 0;
        //     for (var j = 0; j < singleFeedback.length; j++) {
        //         console.log(friendsArray[i].singleScores[j])
        //         console.log(singleFeedback[j])
        //         diff += Math.abs(friendsArray[i].singleScores[j] - singleFeedback[j]);
        //     }
        //     // console.log('diff = ' + diff);

        //     // If lowest difference, record the friend match
        //     if (diff < difference) {
        //         // console.log('Closest match found = ' + diff);
        //         // console.log('Friend name = ' + friends[i].name);
        //         // console.log('Friend image = ' + friends[i].photo);
        //         console.log("working");
        //         difference = diff;
        //         singleMatchName = friendsArray[i].singleName;
        //         singleMatchPhoto = friendsArray[i].singlePhoto;

        //     }
       
    
        


      
 
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

