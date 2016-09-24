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
 * POST /poll
 * Submit a poll made by user.
 */
exports.newPoll = function (userId, question, options) {

    var poll = new Poll({
        postedBy: userId,
        question: question,
        options: options,
        comments: new Array(),
        datePosted: Date.now(),
        pollId: generateUUID(),
    })



};

function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
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
