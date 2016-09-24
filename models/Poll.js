/**
 * Created by Ali on 2016-09-23.
 */
const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    pollId: { type: Number, unique: true },
    postedBy: String, // temporary, should be user
    question: String,
    options: [{title: String, votes: Number}],
    comments: [{ value: String, userID: Number}],
    datePosted: Date,

}, { timestamps: true });


const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
