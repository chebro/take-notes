const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.loginToken;
    // const token = req.header('login-token');
    // console.log(req.header('login-token'));
    // console.log(token);
    // console.log(token === undefined);
    if (token === undefined) return res.status(401).send('Whoops, looks like you are not logged in :( Go back to takenotes.azurewebsites.net/login');
    try {
        var verified = jwt.verify(token, 'mystupidsecret');
        req.user = verified;
        // console.log(verified);
        next();
    } catch (err) {
        // console.log('Invalid Request');
        res.status(400).send('Invalid Token');
    }
};