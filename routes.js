const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const tarefaController = require('./src/controllers/tarefaController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de tarefa
route.get('/tarefa/index', loginRequired, tarefaController.index);
route.post('/tarefa/register', loginRequired, tarefaController.register);
route.get('/tarefa/index/:id', loginRequired, tarefaController.editIndex);
route.post('/tarefa/edit/:id', loginRequired, tarefaController.edit);
route.get('/tarefa/delete/:id', loginRequired, tarefaController.delete);

module.exports = route;
