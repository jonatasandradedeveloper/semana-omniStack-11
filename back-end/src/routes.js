const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create); //L ogin Ongs

routes.get('/ongs', OngController.index); //List ongs

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }), 
}), OngController.create); //Create Ongs

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentsController.index); //List casos

routes.post('/incidents', IncidentsController.create); //Create casos
  
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentsController.delete); //Delete casos

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index); // list dos casos da ong especifica 

module.exports = routes;