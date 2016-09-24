/**
 * Created by Stephen on 2016-09-23.
 */
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    pollID: Number,
    votes: Number,
    title: String

}, { timestamps: true });

/**
 * Helper method for getting user's gravatar.
 */

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;