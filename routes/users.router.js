const express = require('express');
const {validateuser, usersignup, userlogin} = require('../controllers/users.controllers')
const {validateToken, decodeToken} = require('../config/uservalidation')
const router = express.Router();

router.get('/', validateToken, validateuser);
router.post('/signup', usersignup)
router.post('/login', userlogin);

module.exports = router;