const todosModel = require('../models/todos-model');
const jwt = require('../middlewares/jwt-middleware');

module.exports = {
    configuration: (router) => {
        router.get('/todos', jwt, (req, res, next) => {                        
            todosModel.findAll()
                .then((result) => { res.json(result) })
                .catch((error) => { res.json(error) });
        });
        
        router.get('/todo/:id?', jwt, (req, res, next) => {
            const id = parseInt(req.params.id);
            todosModel.findByPk(id)
                .then((result) => { res.json(result) })
                .catch((error) => { res.json(error) });
        });
        
        router.post('/todo', jwt, (req, res, next) => {
            const description = req.body.description;
            const done = req.body.done;
            todosModel.create({
                description, 
                done
            })
            .then((result) => { res.json(result) })
            .catch((error) => { res.json(error) });
        });
        
        router.put('/todo/:id?', jwt, (req, res, next) => {
            const description = req.body.description;
            const done = req.body.done;
            const id = parseInt(req.params.id);            
            todosModel.update({
                description, 
                done
            }, {
                where: { 
                    id
                }
            })
            .then((result) => { res.json(result) })
            .catch((error) => { res.json(error) });
        });
        
        router.delete('/todo/:id?', jwt, (req, res, next) => {
            const id = parseInt(req.params.id);
            todosModel.destroy({
                where: {
                    id
                }
            })
            .then((result) => { res.json(result) })
            .catch((error) => { res.json(error) });
        });
    }
}