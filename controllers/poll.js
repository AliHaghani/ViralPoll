/**
 * Created by Ali on 2016-09-23.
 */

const async = require('async');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
const Poll = require('../models/Poll');


/**
 * GET /newpoll
 * New poll page.
 */
exports.getNewPoll = (req, res) => {
    res.render('newpoll', {
        title: 'New Poll'
    });
};


/**
 * POST /newpoll
 * Submit a poll made by user.
 */
exports.postNewPoll = function (req, res, next) {
    req.assert('title', "Question cannot be blank.").notEmpty();
    req.assert('option1', "Option 1 cannot be blank.").notEmpty();
    req.assert('option2', "Option 2 cannot be blank.").notEmpty();
//  TODO: Add assertion to check for user authentication.
//  req.assert(req.user, "You must login to post a poll.").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/newpoll');
    }

    let opt1 = req.body.option1;
    let opt2 = req.body.option2;

    let options = [];
    options.push({title: opt1, votes: 0});
    options.push({title: opt2, votes: 0});



    const poll = new Poll({
        postedBy: req.user._doc._id.id,
        question: req.body.title,
        options: options,
        comments: new Array(),
        datePosted: Date.now(),
    });

    poll.save((err) =>
    {
        if (err){
            return next(err);
        }
        //some error handling here
        req.flash('success', { msg: 'Poll successfully posted!' });
        res.redirect('/newpoll');
    });

};

/**
 * GET /polls
 * New poll page.
 */
exports.getPolls = (req, res) => {
    Poll.find({}, function(err, polls) {
        if (err) throw err;

        res.render('home', {
                title: "Home",
                pollItems: polls
            }

        );

        return polls;
    }).sort({'createdAt': -1});
};


/*
* GET /poll
* get a single poll
* */

//exports.getPoll = (req, res) =

/**
 * POST /updateVotes
 * Update vote.
 */

exports.updateVotes = (req, res) => {
    var option = req.body.option;
    var poll_id = req.body.poll_id;

    Poll.update({_id: poll_id},
        {
            options: option
        },

        function(err, numberAffected, rawResponse)
        {
            if(err)
                var test = "";

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write("teeeeeeeeeeeeeeest");
            res.end();

        }

    );

    // Poll.findOne({_id: poll_id}, function (err, poll) {
    //
    //
    //     poll.save((err) =>
    //     {
    //         if (err){
    //             console.log('ERROR!');
    //         }
    //         //some error handling here
    //         res.contentType('application/json');
    //         res.send(JSON.stringify(poll));
    //     });
    //
    // });
    //
    // Poll.update({_id: poll_id, "options.title": optionTitle},
    //     {$set:
    //     {
    //         optionToUpd: votes
    //     }
    //     },
    //
    //     function(err)
    //     {
    //         if(err) var test = "";
    //
    //
    //
    //     }
    //
    //
    // );



};




/**
 * GET /polls/{poll_id}
 * Get total vote count.
 */

exports.getVoteCount = (req, res, poll_id) => {
    Poll.findOne({_id: poll_id}, function (err, poll) {
        var totalVotes = 0;

        for (var i = 0; i < poll.options.length; i++){
            totalVotes += poll.options[i].votes;
        }
    });
    return totalVotes;
};


exports.getPollsByUserID = (req, res) =>
{
    Poll.find({postedBy: req.user._doc._id.id}, function(err, polls)
    {
        res.render('account/mypolls', {
                title: "My Polls",
                pollItems: polls
            }

        );

        return polls;

    });
};