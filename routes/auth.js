const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const validateFields = require('../middlewares/validate-fields');

const router = new Router();

router.post( '/', [
    check( 'email', 'Email is mandatory' ).not().isEmpty(),
    check( 'email', 'Invalid email' ).isEmail(),
    check( 'password', 'Password is mandatory' ).not().isEmpty(),
    validateFields
], login );




module.exports = router;