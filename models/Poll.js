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
