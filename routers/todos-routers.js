const todosRepository = require('../repositories/todos-respository');

module.exports = {
    configuration: (router) => {
        router.get('/todos', (req, res) => {            
            todosRepository.all()
                .then(result => { res.json(result) });
        });
        
        router.get('/todo/:id?', (req, res) => {
            const id = parseInt(req.params.id);
            todosRepository.find([id])
                .then((result) => { res.json(result) });
        });
        
        router.post('/todo', (req, res) => {
            const description = req.body.description;
            const done = req.body.done;
            todosRepository.add([description, done])
                .then(response => res.json(response))
                .catch(error => console.log(error));
        });
        
        router.put('/todo/:id?', (req, res) => {
            const description = req.body.description;
            const done = req.body.done;
            const id = parseInt(req.params.id);
            todosRepository.edit([description, done, id])
                .then(response => res.json(response))
                .catch(error => console.log(error));
        });
        
        router.delete('/todo/:id?', (req, res) => {
            const id = parseInt(req.params.id);
            todosRepository.delete([id])
                .then(response => res.json(response))
                .catch(error => console.log(error));
        })        
    }
}