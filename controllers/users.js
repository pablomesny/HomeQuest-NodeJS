const { request, response } = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/user");

const createUser = async( req = request, res = response ) => {

    const { firstName, lastName, email, password } = req.body;

    const user = new User({ firstName, lastName, email, password });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    await user.save();

    res.status(201).json({
        user
    })

}

const updateUser = async( req = request, res = response ) => {

    const { id } = req.params;
    const { firstName, lastName, phone, password, ...rest } = req.body;

    if( password ) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt );
    }

    if( firstName ) {
        rest.firstName = firstName;
    }

    if( lastName ) {
        rest.lastName = lastName;
    }

    if( phone ) {
        rest.phone = phone;
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json({
        user
    })
    

}

module.exports = {
    createUser,
    updateUser
}