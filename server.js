const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const todosRouter = require('./routers/todos-routers');
const usersRouter = require('./routers/users-routers');
const authRouter = require('./routers/auths-routers');
/*
* Express Server Http
*/
const app = express();
const port = process.env.PORT || 8080;

/*
* Routers Configuration
*/
const router = express.Router();
todosRouter.configuration(router);
usersRouter.configuration(router);
authRouter.configuration(router);
/*
* Middleware
*/
// const corsOptions = {
//     origin: true,
//     optionsSuccessStatus: 200
// }
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

/*
* Listen
*/
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log('Para derrubar o servidor: ctrl + c');
});