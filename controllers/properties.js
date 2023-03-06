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

const updateProperty = async( req = request, res = response ) => {

    const { id } = req.params;
    const { propertyType, purpose, title, description, city, province, address, rooms, size, img, bedrooms, constructionYear, hasGarage, price, phone, email, ...rest } = req.body;
    const { body } = req;

    for( const [ key, value ] of Object.entries({ ...body }) ){

        switch( key ) {

            case 'propertyType':
                rest.propertyType = value;
                break;

            case 'purpose':
                rest.purpose = value;
                break;

            case 'title':
                rest.title = value;
                break;

            case 'description':
                rest.description = value;
                break;

            case 'city':
                rest.city = value;
                break;

            case 'province':
                rest.province = value;
                break;

            case 'address':
                rest.address = value;
                break;

            case 'rooms':
                rest.rooms = value;
                break;

            case 'size':
                rest.size = value;
                break;

            case 'img':
                rest.img = value;
                break;

            case 'bedrooms':
                rest.bedrooms = value;
                break;

            case 'constructionYear':
                rest.constructionYear = value;
                break;

            case 'hasGarage':
                rest.hasGarage = value;
                break;

            case 'price':
                rest.price = value;
                break;

            case 'phone':
                rest.phone = value;
                break;

            case 'email':
                rest.email = value;
                break;

        }

    }

    const property = await Property.findByIdAndUpdate( id, rest );

    res.json({
        property
    })
    

}

const deleteProperty = async( req = request, res = response ) => {

    const { id } = req.params;

    const property = await Property.findByIdAndUpdate( id, { state: false });

    res.json({
        property
    })

}



module.exports = {
    getProperties,
    createProperty,
    updateProperty,
    deleteProperty
}