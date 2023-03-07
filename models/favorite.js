const { Schema, model } = require('mongoose');

const FavoriteSchema = Schema({
    properties: {
        type: [Schema.Types.ObjectId],
        ref: 'Property',
        required: [ true, 'Property is mandatory' ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, 'User is mandatory' ],
        unique: true
    }
})

FavoriteSchema.methods.toJSON = function() {
    const { __v, _id, ...favorite } = this.toObject();
    favorite.uid = _id;
    return favorite;
}

module.exports = model( 'Favorite', FavoriteSchema );