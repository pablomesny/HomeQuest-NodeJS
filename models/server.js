const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            properties: '/api/properties'
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
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.users, require('../routes/users'));
        this.app.use( this.paths.properties, require('../routes/properties'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor escuchando en el puerto ${ this.port }`);
        })
    }

}


module.exports = Server;