"use strict";
const express = require('express'),
router = express.Router(),
ctrl = require('./controllers/UserController'),
auth = require('./auth');
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

//router.use('/docs', swaggerUi.serve);
//router.get('/docs', swaggerUi.setup(swaggerDocument));

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.post('/send_email', ctrl.send_email);
router.get('/get_user_details', auth, ctrl.get_user_details)
router.post('/update_user_details', auth, ctrl.update_user_details)
router.get('/get_emergency_contacts', auth, ctrl.get_emergency_contacts)
router.post('/save_emergency_contacts', auth, ctrl.save_emergency_contacts)
 
module.exports = router;
