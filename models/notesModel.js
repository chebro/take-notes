const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const noteSchema = new mongoose.Schema({
    user: String,
    title: String,
    text: String
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

exports.Notes = mongoose.model('Notes', noteSchema);
exports.User = mongoose.model('Users', userSchema);

exports.regValSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

exports.logValSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});