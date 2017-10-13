var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

var profesorService = require('services/profesor.service');

// routes
router.post('/crearProfesor', crearProf);
router.get('/currentProf', getCurrentProf);
router.post('/borrarProfesor', borrarProf);
router.put('/modificarProfesor', modificarprof);

module.exports = router;

function crearProf(req, res){
    profesorService.create(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

function getCurrentProf(req, res){
   profesorService.getById()
    .then(function(prof){
        if(prof){
            res.send(prof);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

function borrarProf(req, res) {
    profesorService.delete(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function modificarprof(req, res) {
    profesorService.update(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}