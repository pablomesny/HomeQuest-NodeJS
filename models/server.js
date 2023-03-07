const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            properties: '/api/properties',
            favorites: '/api/favorites',
            uploads: '/api/uploads'
        }

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        await dbConnection();
    }


    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use( fileUpload() );
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.users, require('../routes/users'));
        this.app.use( this.paths.properties, require('../routes/properties'));
        this.app.use( this.paths.favorites, require('../routes/favorites'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor escuchando en el puerto ${ this.port }`);
        })
    }

}


module.exports = Server;