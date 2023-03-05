const { request, response } = require("express")

const isPropertyTypeValid = ( ...propertyTypes ) => {

    return( req = request, res = response, next ) => {

        if( !propertyTypes.includes( req.body.propertyType ) ) {
            return res.status(401).json({
                ok: false,
                msg: 'Property type is not valid'
            })
        }

        next();

    }

}

module.exports = {
    isPropertyTypeValid
}