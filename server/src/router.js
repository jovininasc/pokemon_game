const express = require('express');
const router = express.Router();
const controllers = require('./controllers/controllers');
const controllerPoke = require('./controllers/controllerPokemon');

//rotas do usuario
router.post('/register', controllers.AddUser);
router.post('/login', controllers.checkLogin);
router.get('/listUser', controllers.listUser);
router.put('/listUser/:id', controllers.changeRole);

//rotas do pokemon
router.get('/listPokemon/:id', controllerPoke.listPokemons);
router.post('/rgtPoke', controllerPoke.registerPoke);
router.put('/rgtPoke/:id', controllerPoke.Fortalecer);
router.delete('/rgtPoke/:id', controllerPoke.soltar);

router.get('/captureView', controllerPoke.capPoke);
router.post('/capturado', controllerPoke.postPokedex);


console.log("ta pegando");

module.exports = router;