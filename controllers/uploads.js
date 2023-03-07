const { request, response } = require("express");

const uploadUserImage = async( req = request, res = response ) => {

    const file = req.files;
    console.log(file);

}




module.exports = {
    uploadUserImage
}