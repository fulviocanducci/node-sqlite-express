const todosModel = require('../models/todos-model');

module.exports = {
    configuration: (router) => {
        router.get('/todos', (req, res) => {                        
            todosModel.findAll()
                .then((result) => { res.json(result) })
                .catch((error) => { res.json(error) });
        });
        
        router.get('/todo/:id?', (req, res) => {
            const id = parseInt(req.params.id);
            todosModel.findByPk(id)
                .then((result) => { res.json(result) })
                .catch((error) => { res.json(error) });
        });
        
        router.post('/todo', (req, res) => {
            const description = req.body.description;
            const done = req.body.done;
            todosModel.create({
                description, 
                done
            })
            .then((result) => { res.json(result) })
            .catch((error) => { res.json(error) });
        });
        
        router.put('/todo/:id?', (req, res) => {
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
        
        router.delete('/todo/:id?', (req, res) => {
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