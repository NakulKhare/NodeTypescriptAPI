// var bcrypt = require('bcrypt');
// bcrypt.hash('nakul', 10, function (err, hash) {
//     console.log(hash)

//     bcrypt.compare("naku", hash, function (err, res) {
//         console.log(res)
//     });
// })

var jwt = require("jsonwebtoken");
// var token = jwt.sign({
//     foo: 'bar',
// }, {
//     algorithm: 'RS256'
// }, 'shhhhh');

// console.log(token)


var token = jwt.sign({
    data: {
        id: 7
    }
}, 'LTA<JVqE;E[$B7Su', {
    expiresIn: '1m'
});

console.log(token)
console.log("###################")




try {
    var decoded = jwt.verify(token, 'LTA<JVqE;E[$B7Su');
    console.log(decoded.data.id)
} catch (e) {
    console.log("token expired")
}