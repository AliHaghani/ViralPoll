/**
 * Created by Ali on 2016-09-23.
 */
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    pollId: { type: Number, unique: true },
    postedBy: User,
    question: String,
    options: Array[Option],
    comments: Array,
    datePosted: Date,

}, { timestamps: true });


/**
 * Helper method for validating user's password.
 */
pollSchema.methods.newPoll = function (userId, question, options) {

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
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
