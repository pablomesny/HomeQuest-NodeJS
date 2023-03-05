const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    firstName: {
        type: String,
        required: [ true, 'First name is mandatory' ]
    },
    lastName: {
        type: String,
        required: [ true, 'Last name is mandatory' ]
    },
    email: {
        type: String,
        required: [ true, 'Email is mandatory' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Password is mandatory' ]
    },
    img: {
        type: String,
        default: null
    },
    phone: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );