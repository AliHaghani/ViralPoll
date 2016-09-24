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

    var poll = new Poll({
        postedBy: "dummyID",
        question: req.body.title,
        options: options,
        comments: new Array(),
        datePosted: Date.now(),
        pollId: createGUID(),
    });

    poll.save((err) =>
    {
        //some error handling here
    });






};


function createGUID() {
    function random() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return random() + random() + '-' + random() + '-' + random() + '-' +
        random() + '-' + random() + random() + random();
}

/**
 * POST /poll
 * Submit a poll made by user.
 */
exports.postPoll = (req, res, next) => {
    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/'); // Go back to home page
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('errors', info);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash('success', { msg: 'Success! You are logged in.' });
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
};
