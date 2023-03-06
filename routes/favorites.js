const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { userByIdExists, propertyByIdExists } = require('../helpers/db-validators');
const { getFavoriesByUserId, addPropertyToFavorites } = require('../controllers/favorites');

const router = new Router();

router.get( '/:userId', [
    check( 'userId', 'UserID is mandatory' ).not().isEmpty(),
    check( 'userId', 'UserID is not a valid MongoID').isMongoId(),
    check( 'userId' ).custom( userByIdExists ),
    validateFields
], getFavoriesByUserId);

router.post( '/', [
    validateJWT,
    check( 'property', 'Property is mandatory' ).not().isEmpty(),
    check( 'property', 'Property is not a valid MongoID' ).isMongoId(),
    check( 'property' ).custom( propertyByIdExists ),
    validateFields
], addPropertyToFavorites);



module.exports = router;