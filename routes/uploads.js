const { Router } = require('express');
const { check } = require('express-validator');
const { uploadUserImage } = require('../controllers/uploads');
const { userByIdExists } = require('../helpers/db-validators');
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
    check( 'id' ).custom( userByIdExists ),
    validateFields
], uploadUserImage);

module.exports = router;