const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const notesModel = require('./../models/notesModel');

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.saveUser = async (req, res) => {
    const { error } = notesModel.regValSchema.validate(req.body);
    if (error) {
        return res.status(400).send(JSON.stringify(error.details[0].message));
    }
    //Check if Email Exists
    const emailExists = await notesModel.User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send(JSON.stringify('Email Already Exists.'));
    }
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new notesModel.User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        return res.send({ user: user._id, registered: 1 });
    }
    catch (err) {
        res.status(400).send(err);
    }
};

exports.loginUser = async (req, res) => {
    //Validate Login Credentials
    const { error } = notesModel.logValSchema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .send(JSON.stringify(error.details[0].message));
    }
    //Check if User Exists
    const user = await notesModel.User.findOne({ email: req.body.email });
    if (!user) {
        return res
            .status(400)
            .send(JSON.stringify('Invalid Email or Password'));
    }
    //Check Password
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        return res
            .status(400)
            .send(JSON.stringify('Invalid Email or Password'));
    }
    const token = jwt.sign({ _id: user._id }, 'mystupidsecret');
    res.cookie('loginToken', token, {
        expires: new Date(Date.now() + 10 * 60 * 1000)
    });
    res.send({ logged: true });
};

exports.logoutUser = (req, res) => {
    res.clearCookie('loginToken');
    res.redirect('/login');
};