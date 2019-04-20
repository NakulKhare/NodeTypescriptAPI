import jwt = require("jsonwebtoken")

export class JWTAuth {

    /**
     * 
     * @param id sets a auth token
     */
    setAuthToken(id: number) {
        return new Promise((resolve, reject) => {
            let token = jwt.sign({
                data: {
                    id: id
                }
            }, 'LTA<JVqE;E[$B7Su', {
                    expiresIn: '1m'
                })

            resolve({
                "auth_token": token
            })
        })
    }

    /**
     * 
     * @param token check a authtoken
     */
    chkAuthToken(token: string) {
        return new Promise((resolve, reject) => {
            try {
                let decodedData = jwt.verify(token, 'LTA<JVqE;E[$B7Su');
                resolve(decodedData)
            } catch{
                reject("Invalid token or token has been expired, please login again")
            }
        })
    }
}