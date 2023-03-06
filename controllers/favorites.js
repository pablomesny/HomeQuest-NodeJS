const { request } = require("express");
const Favorite = require('../models/favorite');

const getFavoriesByUserId = async( req = request, res = response ) => {

    const { userId } = req.params;

    const favorite = await Favorite.findOne({ user: userId });

    if( !favorite ) {
        return res.status(401).json({
            ok: false,
            msg: `No favorites found by UserID: ${ userId }`
        })
    }

    res.json({
        favorite
    })

}

const addPropertyToFavorites = async( req = request, res = response ) => {

    const { property } = req.body;

    const prevFavorites = await Favorite.findOne({ user: req.user._id });

    if( !prevFavorites ) {
        
        const data = {
            properties: property,
            user: req.user._id
        }

        const favorite = new Favorite( data );

        await favorite.save();

        return res.status(201).json({
            favorite
        })
    }

    const data = {
        $push: {
            properties: property
        }
    }

    const favorite = await Favorite.findOneAndUpdate( { user: req.user._id }, data );

    res.status(201).json({
        favorite
    })

}

const deletePropertyFromFavorites = async( req = request, res = response ) => {

    const { property } = req.body;

    const isPropertyInFavorites = await Favorite.findOne({ user: req.user._id, properties: { '$in': property }});

    if( !isPropertyInFavorites ) {
        return res.status(401).json({
            ok: false,
            msg: 'User has no favorites added or property is not in favorites'
        })
    }

    if( isPropertyInFavorites.properties.length === 1 && isPropertyInFavorites ) {
        await Favorite.findOneAndDelete( { user: req.user._id } );

        return res.json({
            msg: 'User favorites register deleted'
        })
    }

    const data = {
        $pull: {
            properties: property
        }
    }

    const favorite = await Favorite.findOneAndUpdate( { user: req.user._id }, data );

    res.json({
        favorite
    })

}


module.exports = {
    getFavoriesByUserId,
    addPropertyToFavorites,
    deletePropertyFromFavorites
}