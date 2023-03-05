const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '20h'
        }, ( err, token ) => {
            if( err ) {
                console.log( err );
                reject( 'Token cannot be created' );
            } else {
                resolve( token );
            }
        } )

    })

}

module.exports = generateJWT;