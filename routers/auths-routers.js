const bcrypt = require('bcrypt');

const userModels = require('../models/users-model');
const { auth, salt } = require('../auth/index');

module.exports = {
    configuration: (router) => {
        router.post('/login', (req, res) => {            
            const email = req.body.email;
            const password = req.body.password;
            userModels.findOne({
                attributes: ['id', 'name', 'email', 'password'],
                where: {
                    email
                }
            })
            .then((result) => {                 
                if (bcrypt.compareSync(password, result.password, salt.value)) {                                          
                    const data = {
                        user: {
                            id: result.id,
                            name: result.name,
                            email: result.email
                        },
                        audience: 'urn:foo',
                        issuer: 'urn:issuer',
                        sub: result.id, 
                        jwtid: result.id,
                        name: result.email,
                    };
                    var token = auth.createToken(data);
                    res.json({
                        token, 
                        'status': 200,
                        'description': 'Login valid'
                    });
                } else {
                    res
                        .status(404)
                        .json({
                            'token':'',
                            'status': 404,
                            'description': 'Login invalid'
                        });
                }                
            })
            .catch((error) => { res.json(error) });
        });
    }
}