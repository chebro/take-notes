const jwt = require('jsonwebtoken');
const notesModel = require('./../models/notesModel');

var isLogged = false;
var tokenInfo = {};

exports.getRoot = (req, res) => {
    // 'GET /'
    // console.log(req.url);
    res.send('Ah');
};

// exports.postRoot = (req, res) => {
//     // 'POST /'
//     console.log(req.body);
//     isLogged = true;
//     tokenInfo = req.body;
//     console.log(isLogged);
//     console.log(tokenInfo);
//     res.end();
// };

exports.getNotes = async (req, res) => {
    // 'GET /home'
    // if (isLogged === true) {
    // const verified = await jwt.verify(tokenInfo.token, 'mystupidsecret');
    //     console.log(verified);
    // console.log(req.user._id);
    await notesModel.Notes.find({ user: req.user._id }, (err, data) => {
        if (err) throw err;
        res.render('notes', { note: data });
    });
};
// else {
//     res.send("Not Logged In");
// }
// };

exports.saveNote = async (req, res) => {
    // 'POST /home'
    // console.log(req.user);
    var data = {
        user: req.user._id,
        title: req.body.title,
        text: req.body.text,
    };
    // console.log(data);
    await notesModel.Notes(data).save((err) => {
        if (err) throw err;
        // console.log('saved!');
    });
    res.end();
};

exports.updateNote = async (req, res) => {
    // 'PUT /home'
    // console.log(req.body.id);
    await notesModel.Notes.find({ _id: req.body.id }).updateOne({ text: req.body.text, title: req.body.title }, (err) => {
        if (err) throw err;
    });
    res.end();
};

exports.deleteNote = async (req, res) => {
    // 'DELETE /home'
    var deleteItem = req.body.delete;
    // console.log(deleteItem);
    await notesModel.Notes.find({ _id: req.body.delete }).deleteOne((err) => {
        if (err) throw err;
    });
    res.end();
};

// module.exports = (app) => {

// app.get('/', (req, res) => {

// });

// app.post('/', (req, res) => {
// });

    // app.get('/home', (req, res) => {
    // });

    // app.get('/register', (req, res) => {

    // });

    // app.get('/login', (req, res) => {

    // });

    // app.post('/home', (req, res) => {

    // });

    // app.delete('/home', (req, res) => {
    // });

    // app.put('/home', (req, res) => {

    // });

    // app.post('/register', async (req, res) => {

    // });

    // app.post('/login', async (req, res) => {

    // });
// };;

        // if (req.body.truth === 1) {
        //     var Note = {}
        //     var NoteInModal = {}
        //     notesModel.Notes.find({ _id: req.body.item }, (err, data) => {
        //         if (err) throw err;
        //         // console.log(data[0])
        //         // console.log(JSON.stringify(data[0]))
        //         console.log(data[0]._id)
        //         NoteInModal = Object.assign({}, data[0]._doc);
        //         // console.log(NoteInModal)
        //         // notesModel.Notes.find({}, (err, data) => {
        //         //     if (err) throw err;
        //         //     // console.log(data)

        //         //     Note = Object.assign({}, data);
        //         //     console.log(Note[0])
        //         // })
        //         console.log(typeof(NoteInModal._id))
        //         res.send(JSON.stringify({ noteInModal: NoteInModal }))
        //     })
        // }