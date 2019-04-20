import path = require('path')
import express = require('express')
import { Users } from "./model/user"
import { JWTAuth } from "./controller/authJWT"

export class Routes {

    router = express.Router({ strict: true })

    objUser = new Users();
    jwtAuth = new JWTAuth();

    constructor() {
        console.log(process.cwd());
    }

    setPath(app: express.Application) {

        /**
         * main index page route
         */
        app.get('/', (req, res) => {
            this.objUser.getAllUser((message: any, responce: any) => {
                res.send({
                    message: message,
                    responce: responce
                })
            })
        });


        /**
         * main user page route
         */

        // add new user
        app.post('/user/add', (req, res) => {

            this.jwtAuth.chkAuthToken(String(req.header("Authorization")).split(" ")[1])
                .then((tokenSuccess) => {
                    this.objUser.addNewUser(req.body.name, req.body.email, req.body.password, (message: any, responce: any) => {
                        res.send({
                            message: message,
                            responce: responce
                        })
                    })
                }).catch((tokenFail) => {
                    res.send({
                        message: "error",
                        responce: tokenFail
                    })
                })

        });

        // update user
        app.put('/user/update', (req, res) => {
            this.jwtAuth.chkAuthToken(String(req.header("Authorization")).split(" ")[1])
                .then((tokenSuccess) => {
                    this.objUser.updateUser(req.query.id, req.body.name, req.body.email, req.body.password, (message: any, responce: any) => {
                        res.send({
                            message: message,
                            responce: responce
                        })
                    })
                }).catch((tokenFail) => {
                    res.send({
                        message: "error",
                        responce: tokenFail
                    })
                })
        })

        // delete user
        app.delete('/user/delete', (req, res) => {
            this.jwtAuth.chkAuthToken(String(req.header("Authorization")).split(" ")[1])
                .then((tokenSuccess) => {
                    this.objUser.deleteUser(req.query.id, (message: any, responce: any) => {
                        res.send({
                            message: message,
                            responce: responce
                        })
                    })
                }).catch((tokenFail) => {
                    res.send({
                        message: "error",
                        responce: tokenFail
                    })
                })
        })


        /**
         * login page route
         */
        app.post('/login', (req, res) => {
            this.objUser.authUser(req.body.email, req.body.password, (message: any, responce: any) => {
                res.send({
                    message: message,
                    responce: responce
                })
            })
        });
    }
}