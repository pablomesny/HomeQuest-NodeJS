const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No token on the request'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findById( uid );

        if( !user ) {
            res.status(401).json({
                ok: false,
                msg: 'Invalid token'
            })
        }

        if( !user.state ) {
            res.status(401).json({
                ok: false,
                msg: 'Invalid token'
            })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log( error );
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }

}

module.exports = validateJWT;