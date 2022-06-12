const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = ({
            users:      '/api/users',
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads'
        });

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

        this.app.use( express.static('public'));
        
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    


    routes() {

        this.app.use( this.paths.auth, require('../routes/auth')) 
        this.app.use( this.paths.categories, require('../routes/category'))        
        this.app.use( this.paths.products, require('../routes/product'))
        this.app.use( this.paths.search, require('../routes/search'))
        this.app.use( this.paths.users, require('../routes/user'))        
        this.app.use( this.paths.uploads, require('../routes/upload'))        
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Run server on port:', this.port);
        })
    }


}


module.exports = Server; 