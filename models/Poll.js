/**
 * Created by Ali on 2016-09-23.
 */
const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    pollId: { type: Number, unique: true },
    postedBy: User,
    question: String,
    options: Array[{title: String, votes: Number }],
    comments: Array[{ value: String, userID: Number}],
    datePosted: Date,

}, { timestamps: true });


const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
