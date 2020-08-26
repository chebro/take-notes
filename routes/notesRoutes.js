const express = require('express');
const notesController = require('../controllers/notesController');
const userController = require('../controllers/userController');
const verify = require('../public/assets/verifyToken');
const noCache = require('../public/assets/noCache');
const router = express.Router();

router
    .route('/home')
    .get(verify, noCache, notesController.getNotes)
    .post(verify, notesController.saveNote)
    .put(verify, notesController.updateNote)
    .delete(verify, notesController.deleteNote);

router
    .route('/')
    .get(noCache, notesController.getRoot);
// .post(notesController.postRoot);

router
    .route('/login')
    .get(noCache, userController.getLogin)
    .post(userController.loginUser);

router
    .route('/register')
    .get(noCache, userController.getRegister)
    .post(userController.saveUser);

router
    .route('/logout')
    .get(noCache, userController.logoutUser);

module.exports = router;



