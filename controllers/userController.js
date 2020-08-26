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
    // 'POST /register'
    //Validate Registraton Credentials
    const { error } = notesModel.regValSchema.validate(req.body);
    if (error) {
        // console.log(error);
        return res.status(400).send(JSON.stringify(error.details[0].message));
    }
    //Check if Email Exists
    const emailExists = await notesModel.User.findOne({ email: req.body.email });
    if (emailExists) {
        // console.log('Email Already Exists.');
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
        // console.log({ user: user._id });
        return res.send({ user: user._id, registered: 1 });
    }
    catch (err) {
        res.status(400).send(err);
    }
};

exports.loginUser = async (req, res) => {
    // 'POST /login'
    //Validate Login Credentials
    const { error } = notesModel.logValSchema.validate(req.body);
    if (error) {
        // console.log(error);
        return res
            .status(400)
            .send(JSON.stringify(error.details[0].message));
    }
    //Check if User Exists
    const user = await notesModel.User.findOne({ email: req.body.email });
    if (!user) {
        // console.log('Invalid Email or Password');
        return res
            .status(400)
            .send(JSON.stringify('Invalid Email or Password'));
    }
    //Check Password
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        // console.log('Invalid Email or Password');
        return res
            .status(400)
            .send(JSON.stringify('Invalid Email or Password'));
    }
    const token = jwt.sign({ _id: user._id }, 'mystupidsecret');
    // res.clearCookie('loginToken');
    res.cookie('loginToken', token, {
        expires: new Date(Date.now() + 10 * 60 * 1000)
    });
    res.send({ logged: true });
    // .header('login-token', token)
    // .send({ token: token, logged: 1 });
};

exports.logoutUser = (req, res) => {
    res.clearCookie('loginToken');
    res.redirect('/login');
};