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
    console.log(prevFavorites);

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


module.exports = {
    getFavoriesByUserId,
    addPropertyToFavorites
}