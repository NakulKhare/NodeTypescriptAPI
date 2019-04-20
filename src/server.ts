import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');
import http = require('http');
import cors = require('cors');
import { Routes } from './routes';

export class App {

    app: express.Application;
    routerPath = new Routes();

    constructor() {

        /**
         * setting the port
         */
        let PORT = process.env.PORT || '3000';


        /**
         * now create our server
         */
        this.app = express();
        this.app.options('*', cors());
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        /**
         * setting routes
         */
        this.routerPath.setPath(this.app);

        this.app.set('port', PORT);
        let SERVER = http.createServer(this.app);

        SERVER.listen(PORT, () => {
            console.log(`Running on localhost:${PORT}`);
        });

    }
}