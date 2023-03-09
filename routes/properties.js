const { Router } = require('express');
const { check } = require('express-validator');
const { getProperties, createProperty, updateProperty, deleteProperty } = require('../controllers/properties');
const { propertyByIdExists } = require('../helpers/db-validators');
const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const { isPropertyTypeValid } = require('../middlewares/validate-property-type');

const router = new Router();

router.get( '/', getProperties );

router.post( '/', [
    validateJWT,
    check( 'propertyType', 'Property type is mandatory' ).not().isEmpty(),
    isPropertyTypeValid( 'departamento', 'casa', 'terreno' ),
    check( 'purpose', 'Purpose is mandatory' ).not().isEmpty(),
    check( 'title', 'Title is mandatory' ).not().isEmpty(),
    check( 'description', 'Description is mandatory' ).not().isEmpty(),
    check( 'city', 'City is mandatory' ).not().isEmpty(),
    check( 'province', 'Province is mandatory' ).not().isEmpty(),
    check( 'address', 'Address is mandatory' ).not().isEmpty(),
    check( 'rooms', 'Rooms is mandatory' ).not().isEmpty(),
    check( 'size', 'Size is mandatory' ).not().isEmpty(),
    check( 'bedrooms', 'Bedrooms are mandatory' ).not().isEmpty(),
    check( 'constructionYear', 'Construction year is mandatory' ).not().isEmpty(),
    check( 'hasGarage', 'Has garage is mandatory' ).not().isEmpty(),
    check( 'price', 'Price is mandatory' ).not().isEmpty(),
    check( 'phone', 'Phone is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is mandatory' ).not().isEmpty(),
    check( 'email', 'Email is not valid' ).isEmail(),
    validateFields
], createProperty);

router.put( '/:id', [
    validateJWT,
    check( 'id', 'Id is mandatory' ).not().isEmpty(),
    check( 'id', 'Is not a valid MongoID').isMongoId(),
    check( 'id' ).custom( propertyByIdExists ),
    validateFields
], updateProperty);

router.delete( '/:id', [
    validateJWT,
    check( 'id', 'Id is mandatory' ).not().isEmpty(),
    check( 'id', 'Is not a valid MongoID').isMongoId(),
    check( 'id' ).custom( propertyByIdExists ),
    validateFields
], deleteProperty);






module.exports = router;