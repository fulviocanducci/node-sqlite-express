const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todosRouter = require('./routers/todos-routers');

/*
* Express Server Http
*/
const app = express();
const port = 3000;

/*
* Routers Configuration
*/
const router = express.Router();
todosRouter.configuration(router);

/*
* Middleware
*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

/*
* Listen
*/
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log('Para derrubar o servidor: ctrl + c');
});