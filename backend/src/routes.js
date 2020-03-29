const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

const OngValidator = require('./validators/OngValidator');
const ProfileValidator = require('./validators/ProfileValidator');
const SessionValidator = require('./validators/SessionValidator');
const IncidentValidator = require('./validators/IncidentValidator');

routes.post('/sessions', SessionValidator, SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngValidator, OngController.create);

routes.get('/profile', ProfileValidator, ProfileController.index);

routes.get('/incidents', IncidentValidator.index, IncidentController.index);
routes.post('/incidents', IncidentValidator.create, IncidentController.create);
routes.delete('/incidents/:id', IncidentValidator.delete, IncidentController.delete);

module.exports = routes;