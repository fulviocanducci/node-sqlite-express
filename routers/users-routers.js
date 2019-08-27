const usersModel = require('../models/users-model');
const bcrypt = require('bcrypt');

const salt = 10;

module.exports = {
    configuration: (router) => {
        router.get('/users', (req, res) => {                        
            usersModel.findAll()
                .then((result) => { res.json(result) })
                .catch((error) => { res.json(error) });
        });
        
        router.get('/user/:id?', (req, res) => {
            const id = parseInt(req.params.id);
            usersModel.findByPk(id)
                .then((result) => { res.json(result) })
                .catch((error) => { res.json(error) });
        });
        
        router.post('/user', async (req, res) => {
            const name = req.body.name;
            const email = req.body.email;
            const password = await bcrypt.hash(req.body.password, salt);
            const app_id = req.body.app_id || null;
            const active = parseInt(req.body.active) || 0;
            const data = {
                name,
                email,
                password,
                app_id,
                active
            };
            console.log(data);
            usersModel.create(data)
            .then((result) => { res.json(result) })
            .catch((error) => { res.json(error) });
        });
        
        router.put('/user/:id?', async (req, res) => {
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
                data.password = await bcrypt.hash(req.body.password, salt);
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
        
        router.delete('/user/:id?', (req, res) => {
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