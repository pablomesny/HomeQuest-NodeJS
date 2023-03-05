const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, updateUser } = require('../controllers/users');
const { emailExists, userByIdExists } = require('../helpers/db-validators');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

const router = new Router();

router.post( '/', [
    check( 'firstName', 'First name is mandatory' ).not().isEmpty(),
    check( 'lastName', 'Last name is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is not valid' ).isEmail(),
    check( 'email' ).custom( emailExists ),
    check( 'password', 'Password is mandatory' ).not().isEmpty(),
    check( 'password', 'Password should have at least 8 characters').isLength({ min: 8 }),
    validateFields
], createUser);

router.put( '/:id', [
    validateJWT,
    check( 'id', 'Id is not a valid MongoID' ).isMongoId(),
    check( 'id' ).custom( userByIdExists ),
    validateFields
], updateUser);




module.exports = router;