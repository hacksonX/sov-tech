const { Router } = require('express');
const Controller = require('./controller.js');

const routes = Router();
routes.get('/users', Controller.getAllUsers);
routes.post('/users', Controller.addUser);
routes.search('/users', Controller.search); //Custom HTTP Method
routes.patch('/users/:id_number', Controller.updateUser);
routes.delete('/users/:id_number', Controller.deleteUser);

module.exports = routes;