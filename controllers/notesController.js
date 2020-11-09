const jwt = require('jsonwebtoken');
const notesModel = require('./../models/notesModel');

exports.getRoot = (req, res) => {
    res.redirect('/home');
};

exports.getNotes = async (req, res) => {
    await notesModel.Notes.find({ user: req.user._id }, (err, data) => {
        if (err) throw err;
        res.render('notes', { note: data });
    });
};

exports.saveNote = async (req, res) => {
    var data = {
        user: req.user._id,
        title: req.body.title,
        text: req.body.text,
    };
    await notesModel.Notes(data).save((err) => {
        if (err) throw err;
    });
    res.end();
};

exports.updateNote = async (req, res) => {
    await notesModel.Notes.find({ _id: req.body.id }).updateOne({ text: req.body.text, title: req.body.title }, (err) => {
        if (err) throw err;
    });
    res.end();
};

exports.deleteNote = async (req, res) => {
    var deleteItem = req.body.delete;
    await notesModel.Notes.find({ _id: req.body.delete }).deleteOne((err) => {
        if (err) throw err;
    });
    res.end();
};
