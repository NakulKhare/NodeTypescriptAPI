import mysql = require('mysql')
import bcrypt = require('bcrypt')
import async = require('async')
import { JWTAuth } from "../controller/authJWT"

export class Users {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'node_tst'
    })

    jwtAuth = new JWTAuth

    /**
     * creates a user table
     */
    constructor() {
        this.connection.connect((err: any) => {
            if (!err) {
                let query = "CREATE TABLE IF NOT EXISTS `node_tst`.`users` ( `user_id` INT NOT NULL AUTO_INCREMENT , `user_name` VARCHAR(150) NOT NULL , `user_email` VARCHAR(150) NOT NULL , `user_password` VARCHAR(150) NOT NULL , PRIMARY KEY (`user_id`)) ENGINE = InnoDB;"

                this.connection.query(query, (error: any, results: any, fields: any) => {
                    if (!error) {
                        // console.log(results)
                        // console.log(fields)
                    } else {
                        console.log(error)
                    }
                })
            } else {
                console.log('connection err')
            }
        })
    }

    /**
     * add user
     */
    addNewUser(userName: string, userEmail: string, userPass: string, callback: any) {

        if (this.connection.threadId) {

            new Promise((resolve, reject) => {
                bcrypt.hash(userPass, 10, function (err, hash) {
                    if (!err) {
                        resolve(hash)
                    } else {
                        reject(err)
                    }
                })
            }).then((result) => {
                let query = `INSERT INTO users (user_name, user_email, user_password) VALUES 
                        ('${userName}', '${userEmail}', '${result}');`

                this.connection.query(query, (error: any, results: any, fields: any) => {
                    if (!error) {
                        callback('success', results)
                    } else {
                        console.log(error)
                        callback('error', 'database query error')
                    }
                })
            }).catch((error) => {
                console.log("hash err")
            })

        } else {
            callback('error', 'database connection error')
        }

    }


    /**
    * update user
    */
    updateUser(userID: number, userName: string, userEmail: string, userPass: string, callback: any) {
        if (this.connection.threadId) {

            new Promise((resolve, reject) => {
                bcrypt.hash(userPass, 10, function (err, hash) {
                    if (!err) {
                        resolve(hash)
                    } else {
                        reject(err)
                    }
                })
            }).then((result) => {
                let query = "UPDATE `users` SET `user_name` = '" + userName + "', `user_email` = '" + userEmail + "', `user_password` = '" + result + "' WHERE `users`.`user_id` = " + userID + ";"
                console.log(query)

                this.connection.query(query, (error: any, results: any, fields: any) => {
                    if (!error) {
                        callback('success', results)
                    } else {
                        console.log(error)
                        callback('error', 'database query error')
                    }
                })
            }).catch((error) => {
                console.log("hash err")
            })

        } else {
            callback('error', 'database connection error')
        }
    }


    /**
    * delete user
    */
    deleteUser(userID: number, callback: any) {
        if (this.connection.threadId) {

            let query = `DELETE FROM users WHERE user_id=${userID};`

            this.connection.query(query, (error: any, results: any, fields: any) => {
                if (!error) {
                    callback('success', results)
                } else {
                    console.log(error)
                    callback('error', 'database query error')
                }
            })

        } else {
            callback('error', 'database connection error')
        }
    }


    /**
     * authencate user
     */
    authUser(email: string, password: string, callback: any) {
        if (this.connection.threadId) {
            let query = "SELECT * FROM `users` WHERE user_email = '" + email + "'"

            this.connection.query(query, (error: any, results: any, fields: any) => {
                if (!error) {
                    bcrypt.compare(password, results[0].user_password, (err, res) => {
                        if (res == true) {
                            this.jwtAuth.setAuthToken(results[0].user_id).then((token) => {
                                callback('success', token)
                            })
                        } else {
                            callback('error', 'Invalid username and password')
                        }
                    })
                } else {
                    console.log(error)
                    callback('error', 'database query error')
                }
            })


        } else {
            callback('error', 'database connection error')
        }
    }


    /**
     * get all user
     */
    getAllUser(callback: any) {
        if (this.connection.threadId) {

            let query = `SELECT * FROM users;`

            this.connection.query(query, (error: any, results: any, fields: any) => {
                if (!error) {
                    callback('success', results)
                } else {
                    console.log(error)
                    callback('error', 'database query error')
                }
            })

        } else {
            callback('error', 'database connection error')
        }
    }
}