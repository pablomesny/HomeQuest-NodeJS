const { request, response } = require("express");
const loadFile = require("../helpers/load-file");
const Property = require("../models/property");
const User = require("../models/user");

const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dyhvwwoh7', 
    api_key: '631114451637847', 
    api_secret: 'BUgo0axgwSSR9h3g9DyuLXFv8Co'
  });

const uploadUserImage = async( req = request, res = response ) => {

    const { tempFilePath } = req.files;
    const { collection, id } = req.params;

    let model;

    switch( collection ) {

        case 'users':
            model = await User.findById( id );
            if( !model ) {
                return res.status(400).json({
                    ok: false,
                    msg: `User does not exists with ID: ${ id }`
                })
            }
            break;

        case 'properties':
            model = await Property.findById( id );
            if( !model ) {
                return res.status(400).json({
                    ok: false,
                    msg: `Property does not exists with ID: ${ id }`
                })
            }
            break;

        default:
            res.status(500).json({
                ok: false,
                msg: 'Collection is not added into controller'
            })
    }

    if( model.img ) {

        const nameArr = model.img.split('/');
        const fileName = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = fileName.split('.');

        cloudinary.uploader.destroy( public_id );

    }
    
    try {
        
        const { tempFilePath } = await loadFile( req.files );
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

        model.img = secure_url;
        
        if( collection === 'users'.toLowerCase() ) {
            await User.findByIdAndUpdate( id, model );

            return res.json({
                model
            })
        } else if( collection === 'properties' ) {
            await Property.findByIdAndUpdate( id, model );

            return res.json({
                model
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error
        })
    }
    

}




module.exports = {
    uploadUserImage
}