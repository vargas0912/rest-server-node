const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //middlewares
        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use( cors() );

        this.app.use( express.static('public'))
    }


    routes() {
        this.app.get('/api', (_req, res) => {
            res.json({                
                'msg': 'Get API'
            })
        });

        this.app.put('/api', (_req, res) => {
            res.json({                
                'msg': 'PUT API'
            })
        });

        this.app.post('/api', (_req, res) => {
            res.json({                
                'msg': 'POST API'
            })
        });

        this.app.delete('/api', (_req, res) => {
            res.json({                
                'msg': 'DELETE API'
            })
        });

        this.app.patch('/api', (_req, res) => {
            res.json({                
                'msg': 'PATCH API'
            })
        });

       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Run server on port:', this.port);
        })
    }


}


module.exports = Server; 