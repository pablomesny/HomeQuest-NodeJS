const { request } = require("express");
const Property = require('../models/property');
const Favorite = require('../models/favorite');

const getFavoriesByUserId = async( req = request, res = response ) => {

    const { userId } = req.params;

    const favorite = await Favorite.findOne({ user: userId });

    if( !favorite ) {
        return res.json(401).json({
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
        properties: prevFavorites.properties.push( property ),
        user: req.user._id
    }

    const favorite = new Favorite( data );
    
    await favorite.save();

    res.status(201).json({
        favorite
    })

}


module.exports = {
    getFavoriesByUserId,
    addPropertyToFavorites
}