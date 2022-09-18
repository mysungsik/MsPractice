const express = require('express');
const authControllers = require("../controllers/auth-controllers")
const router = express.Router();

router.get('/signup', authControllers.getSignup);

router.get('/login', authControllers.getLogin);

router.post('/signup',authControllers.createAccount);

router.post('/login',authControllers.login);

router.post('/logout',authControllers.logout);

router.get("/401", authControllers.get401)

module.exports = router;
