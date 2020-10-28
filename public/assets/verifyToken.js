const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.loginToken;
    if (token === undefined) return res.status(401).redirect('/login');
    try {
        var verified = jwt.verify(token, 'mystupidsecret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};