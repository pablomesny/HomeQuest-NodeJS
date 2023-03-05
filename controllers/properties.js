const { request, response } = require("express");
const Property = require('../models/property');

const getProperties = async( req = request, res = response ) => {

    const { limit = 0 , from = 0 } = req.query;

    const [ total, properties ] = await Promise.all([
        Property.countDocuments({ state: true }),
        Property.find({ state: true })
            .skip( Number(from) )
            .limit( Number(limit) )
            .populate( 'createdBy', [ 'firstName', 'lastName', 'img' ] )
    ])

    res.json({
        total,
        properties
    })

}

const createProperty = async( req = request, res = response ) => {

    const { body } = req;

    const data = {
        ...body,
        createdBy: req.user._id
    }

    const property = new Property( data );

    await property.save();

    res.status(201).json({
        property
    })

}



module.exports = {
    getProperties,
    createProperty
}