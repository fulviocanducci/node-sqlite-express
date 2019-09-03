const bcrypt = require('bcrypt');

const usersModel = require('../models/users-model');
const jwt = require('../middlewares/jwt-middleware');
const { salt } = require('../auth/index');

module.exports = {    
    configuration: (router) => {        
        router.get('/api/users', jwt, (req, res, next) => {                        
            usersModel.findAll()
                .then((result) => { res.json(result) })
                .catch((error) => { res.json(error) });
        });
        
        router.get('/api/user/:id?', jwt, (req, res, next) => {
            const id = parseInt(req.params.id);
            usersModel.findByPk(id)
                .then((result) => { res.json(result) })
                .catch((error) => { res.json(error) });
        });
        
        router.post('/api/user', jwt, async (req, res, next) => {
            const name = req.body.name;
            const email = req.body.email;
            const password = bcrypt.hashSync(req.body.password, salt.value);
            const app_id = req.body.app_id || null;
            const active = parseInt(req.body.active) || 0;
            const data = {
                name,
                email,
                password,
                app_id,
                active
            };            
            usersModel.create(data)
            .then((result) => { res.json(result) })
            .catch((error) => { res.json(error) });
        });
        
        router.put('/api/user/:id?', jwt, async (req, res, next) => {
            const name = req.body.name;
            const email = req.body.email;
            let password = req.body.password;
            const app_id = req.body.app_id || null;
            const active = parseInt(req.body.active) || 0;
            const id = parseInt(req.params.id); 
            let data = {
                name,
                email,
                password,
                app_id,
                active
            };
            if (password) {
                data.password = bcrypt.hashSync(req.body.password, salt.value);
            } else {
                delete data.password;
            }
            usersModel.update(data, {
                where: { 
                    id
                }
            })
            .then((result) => { res.json(result) })
            .catch((error) => { res.json(error) });
        });
        
        router.delete('/api/user/:id?', jwt, (req, res, next) => {
            const id = parseInt(req.params.id);
            usersModel.destroy({
                where: {
                    id
                }
            })
            .then((result) => { res.json(result) })
            .catch((error) => { res.json(error) });
        });
    }
}