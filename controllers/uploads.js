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

const uploadImage = async( req = request, res = response ) => {

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
            return res.status(500).json({
                ok: false,
                msg: 'Collection is not added into the controller'
            });
    }

    if( model.img && collection === 'users' ) {

        const nameArr = model.img.split('/');
        const fileName = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = fileName.split('.');

        cloudinary.uploader.destroy( public_id );

    }
    
    try {
        
        const { tempFilePath } = await loadFile( req.files );
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

        if( collection === 'properties' ) {
            model.img.push( secure_url );
        } else {
            model.img = secure_url;
        }
        
        if( collection === 'users' ) {
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

const deleteImage = async( req = request, res = response ) => {

    const { collection, id } = req.params;
    const { photo_url } = req.body;

    switch( collection ) {

        case 'properties':
            if( !photo_url ) {
                return res.status(401).json({
                    ok: false,
                    msg: 'Photo URL is mandatory'
                });
            }
    
            const property = await Property.findByIdAndUpdate( id, {
                $pull: {
                    img: photo_url
                }
            })

            if( !property ) {
                return res.status(400).json({
                    ok: false,
                    msg: `Property does not exists with ID: ${ id }`
                })
            }

            const propertyImageArr = photo_url.split('/');
            const propertyFileName = propertyImageArr[ propertyImageArr.length - 1 ];
            const [ public_property_id ] = propertyFileName.split('.');

            cloudinary.uploader.destroy( public_property_id );
    
            return res.json({
                property
            })

        case 'users':
            const user = await User.findByIdAndUpdate( id, { img: null } );

            if( !user ) {
                return res.status(400).json({
                    ok: false,
                    msg: `User does not exists with ID: ${ id }`
                })
            }

            if ( !user.img ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User does not have an image'
                })
            }

            const userImageArr = user.img.split('/');
            const userFileName = userImageArr[ userImageArr.length - 1 ];
            const [ public_user_id ] = userFileName.split('.');

            cloudinary.uploader.destroy( public_user_id );

            return res.json({
                user
            })


        default:
            return res.status(500).json({
                ok: false,
                msg: 'Collection is not added into the controller'
            })

    }

}




module.exports = {
    deleteImage,
    uploadImage
}