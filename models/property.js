const { Schema, model } = require('mongoose');

const PropertySchema = Schema({
    propertyType: {
        type: String,
        required: [ true, 'Property type is mandatory' ]
    },
    purpose: {
        type: String,
        required: [ true, 'Purpose is mandatory' ]
    },
    title: {
        type: String,
        required: [ true, 'Title is mandatory' ]
    },
    description: {
        type: String,
        required: [ true, 'Description is mandatory' ]
    },
    city: {
        type: String,
        required: [ true, 'City is mandatory' ]
    },
    province: {
        type: String,
        required: [ true, 'Province is mandatory' ]
    },
    address: {
        type: String,
        required: [ true, 'Address is mandatory' ]
    },
    rooms: {
        type: Number,
        required: [ true, 'Amount of rooms is mandatory' ]
    },
    size: {
        type: String,
        required: [ true, 'Size is mandatory' ]
    },
    img: {
        type: [String],
        default: null
    },
    bedrooms: {
        type: Number,
        required: [ true, 'Amount of bedrooms is mandatory' ]
    },
    constructionYear: {
        type: Number,
        required: [ true, 'Construction year is mandatory' ]
    },
    hasGarage: {
        type: Boolean,
        required: [ true, 'Has garage is mandatory' ]
    },
    price: {
        type: Number,
        required: [ true, 'Price is mandatory' ]
    },
    phone: {
        type: String,
        required: [ true, 'Phone number is mandatory' ]
    },
    email: {
        type: String,
        required: [ true, 'Email is mandatory' ]
    },
    state: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

PropertySchema.methods.toJSON = function() {
    const { __v, _id, ...property } = this.toObject();
    property.uid = _id;
    return property;
}

module.exports = model( 'Property', PropertySchema, 'properties' );