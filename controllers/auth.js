const { request, response } = require("express");
const bcrypt = require('bcrypt');
const User = require('../models/user');
const generateJWT = require("../helpers/generate-jwt");

const login = async( req = request, res = response ) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if( !user ) {
        return res.status(401).json({
            ok: false,
            msg: 'Incorrect email or password'
        })
    }

    if( user.state === false ) {
        return res.status(401).json({
            ok: false,
            msg: 'Incorrect email or password'
        })
    }

    const validPassword = bcrypt.compareSync( password, user.password );

    if( !validPassword ) {
        return res.status(401).json({
            ok: false,
            msg: 'Incorrect email or password'
        })
    }

    const token = await generateJWT( user.id );

    res.json({
        user,
        token
    })
}

module.exports = {
    login
}

