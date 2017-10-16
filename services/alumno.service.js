var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('alumno');

var service = {};

service.create = create;
service.getById = getById;
service.delete = _delete;
service.update = update;

module.exports = service;

function create(AlumParam){

    var deferred = Q.defer();
   
    db.alumno.insert(
    AlumParam,
    function(err, doc){
            if(err) deferred.reject(err);

            deferred.resolve();
    });

    return deferred.promise;
}

function getById(){
    var deferred = Q.defer();

    var mysort = {_id: 1};

    db.alumno.find().sort(mysort).toArray(function(err, alum){
            if(err) deferred.reject(err);

            if(alum){
                    deferred.resolve(alum);
            }else{
                deferred.resolve();
            }       
    });
    return deferred.promise;
}

function _delete(AlumParam){
    
    var deferred = Q.defer();
    var id= AlumParam._id;

    db.alumno.remove(
    {_id: mongo.helper.toObjectID(AlumParam._id)},
    function(err){
        if(err) deferred.reject(err);
        
        deferred.resolve();
    });
    return deferred.promise;
}

function update(AlumParam){

    var deferred = Q.defer();
    
    var id= AlumParam._id;
    var nombre = AlumParam.nombre;
    var apellidos = AlumParam.apellidos;
    var direccion = AlumParam.direccion; 
    var telefono = AlumParam.telefono;

        var set = { 
                    nombre: nombre,
                    apellidos: apellidos,
                    direccion: direccion,
                    telefono: telefono,
        };

        db.alumno.update(
        {_id: mongo.helper.toObjectID(AlumParam._id)},
        {$set: set},
        function(err){
            if(err) deferred.reject(err);
            
            deferred.resolve();
        });

    return deferred.promise;
}