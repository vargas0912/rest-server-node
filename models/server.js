const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';

        this.dbConnect();

        //middlewares
        this.middlewares();

        this.routes();
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public'))
    }


    routes() {
        this.app.use( this.usersPath, require('../routes/user')) 

       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Run server on port:', this.port);
        })
    }


}


module.exports = Server; 