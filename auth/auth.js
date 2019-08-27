const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
    createToken(data) {
        // { expiresIn: '1h' }
        // https://github.com/auth0/node-jsonwebtoken    
        const options = { 
            expiresIn: 60 * 60,
            algorithm: 'RS256'
        }    
        return jwt.sign(data, this.loadPrivateKey(), options);
    },
    verifyToken(token) {        
        return jwt.verify(token, this.loadPublicKey());        
    },
    loadPrivateKey() {
        return fs.readFileSync('./myprivate.pem').toString();
    },
    loadPublicKey() {
        return fs.readFileSync('./mypublic.pem').toString();
    }
}

// jwt.sign({
//     data: 'foobar'
//   }, 'secret', { expiresIn: '1h' });

//const privatekey = fs.readFileSync('../myprivate.pem').toString();
// const data = {
//     audience: 'urn:foo',
//     issuer: 'urn:issuer',
//     sub: "1", 
//     jwtid: "1",
//     name:"name", 
//     user: {id:1}
// }
// const token = jwt.sign(data, privatekey, { algorithm: 'RS256'});
// console.log(token);

// const publickey = fs.readFileSync('../mypublic.pem').toString();
// console.log(publickey.toString());
// const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWRpZW5jZSI6InVybjpmb28iLCJpc3N1ZXIiOiJ1cm46aXNzdWVyIiwic3ViIjoiMSIsImp3dGlkIjoiMSIsIm5hbWUiOiJuYW1lIiwidXNlciI6eyJpZCI6MX0sImlhdCI6MTU2NjkxOTM5MH0.LpXIazGMxFoLEm-Ntv52aKZb7ecdQcMhQtT7-IWGSpcTrUdOZu3kZeXcIxvcP9NbVmQDTyWvcJ4dRihhZrYd7Q";
// const decode = jwt.verify(token, publickey, { algorithm: 'RS256'});
// console.log(decode);

// # Create a file containing all lower case alphabets
// $ echo abcdefghijklmnopqrstuvwxyz > myfile.txt
// # Generate 512 bit Private key
// $ openssl genrsa -out myprivate.pem 512
// # Separate the public part from the Private key file.
// $ openssl rsa -in myprivate.pem -pubout > mypublic.pem
// # Cat the contents of private key
// $ cat myprivate.pem
// -----BEGIN RSA PRIVATE KEY-----
// MIIBOwIBAAJBAMv7Reawnxr0DfYN3IZbb5ih/XJGeLWDv7WuhTlie//c2TDXw/mW
// 914VFyoBfxQxAezSj8YpuADiTwqDZl13wKMCAwEAAQJAYaTrFT8/KpvhgwOnqPlk
// NmB0/psVdW6X+tSMGag3S4cFid3nLkN384N6tZ+na1VWNkLy32Ndpxo6pQq4NSAb
// YQIhAPNlJsV+Snpg+JftgviV5+jOKY03bx29GsZF+umN6hD/AiEA1ouXAO2mVGRk
// BuoGXe3o/d5AOXj41vTB8D6IUGu8bF0CIQC6zah7LRmGYYSKPk0l8w+hmxFDBAex
// IGE7SZxwwm2iCwIhAInnDbe2CbyjDrx2/oKvopxTmDqY7HHWvzX6K8pthZ6tAiAw
// w+DJoSx81QQpD8gY/BXjovadVtVROALaFFvdmN64sw==
// -----END RSA PRIVATE KEY-----