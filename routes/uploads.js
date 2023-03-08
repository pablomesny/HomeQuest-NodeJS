const { Router } = require('express');
const { check } = require('express-validator');
const { uploadImage, deleteImage } = require('../controllers/uploads');
const validateFields = require('../middlewares/validate-fields');
const validateFile = require('../middlewares/validate-file');
const validateJWT = require('../middlewares/validate-jwt');

const router = new Router();

router.put( '/:collection/:id', [
    validateJWT,
    validateFile,
    check( 'collection', 'Collection is mandatory' ).not().isEmpty(),
    check( 'id', 'Id is mandatory' ).not().isEmpty(),
    check( 'id', 'Id is not a valid MongoID' ).isMongoId(),
    validateFields
], uploadImage);

router.delete( '/:collection/:id', [
    validateJWT,
    check( 'collection', 'Collection is mandatory' ).not().isEmpty(),
    check( 'id', 'Id is mandatory' ).not().isEmpty(),
    check( 'id', 'Id is not a valid MongoID' ).isMongoId(),
    validateFields
], deleteImage);

module.exports = router;