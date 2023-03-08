const { request } = require("express");

const validateFile = ( req = request, res = response, next ) => {

    if( !req.files || Object.keys( req.files ).length === 0 || !req.files.file ) {
        return res.status(400).json({
            ok: false,
            msg: 'No files to upload'
        })
    }

    next();

}


module.exports = validateFile;