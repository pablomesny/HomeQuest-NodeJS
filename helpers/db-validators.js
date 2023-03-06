const User = require("../models/user");
const Property = require('../models/property');

const emailExists = async( email = '' ) => {

    const emailExists = await User.findOne({ email });

    if( emailExists ) {
        throw new Error( `Email: ${ email } already exists` );
    }

}

const userByIdExists = async( id = '' ) => {

    const userExists = await User.findById( id );

    if( !userExists ) {
        throw new Error( `UserID: ${ id } does not exists` );
    }

}

const propertyByIdExists = async( id = '' ) => {

    const propertyExists = await Property.findById( id );

    if( !propertyExists ) {
        throw new Error( `PropertyID: ${ id } does not exists` );
    }
}

module.exports = {
    emailExists,
    userByIdExists,
    propertyByIdExists
}