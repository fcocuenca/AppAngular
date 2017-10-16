var config = require('config.json');
var express = require('express');
var router = express.Router();

var alumnoService = require('services/alumno.service');

// routes
router.post('/crearAlumno', crearAlum);
router.get('/currentAlumno', getCurrentAlum);
router.post('/borrarAlumno', borrarAlum);
router.post('/modificarAlumno', modificarAlum);

module.exports = router;

function crearAlum(req, res){
    alumnoService.create(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

function getCurrentAlum(req, res){
   alumnoService.getById()
    .then(function(alum){
        if(alum){
            res.send(alum);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

function borrarAlum(req, res) {
    alumnoService.delete(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function modificarAlum(req, res) {
    alumnoService.update(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}