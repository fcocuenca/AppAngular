var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('profesor');

var service = {};

service.create = create;
service.getById = getById;
service.delete = _delete;
service.update = update;

module.exports = service;

function create(ProfParam){

    var deferred = Q.defer();
   
    db.profesor.insert(
    ProfParam,
    function(err, doc){
            if(err) deferred.reject(err);

            deferred.resolve();
    });

    return deferred.promise;
}

function getById(){
    var deferred = Q.defer();

    var mysort = {_id: 1};

    db.profesor.find().sort(mysort).toArray(function(err, prof){
            if(err) deferred.reject(err);

            if(prof){
                    deferred.resolve(prof);
            }else{
                deferred.resolve();
            }       
    });
    return deferred.promise;
}

function _delete(ProfParam){
    
    var deferred = Q.defer();
    var id= ProfParam._id;

    db.profesor.remove(
    {_id: mongo.helper.toObjectID(ProfParam._id)},
    function(err){
        if(err) deferred.reject(err);
        
        deferred.resolve();
    });
    return deferred.promise;
}

function update(ProfParam){

    var deferred = Q.defer();
    
    var id= ProfParam._id;
    var nombre = ProfParam.nombre;
    var apellidos = ProfParam.apellidos;
    var direccion = ProfParam.direccion; 
    var telefono = ProfParam.telefono;

        var set = { 
                    nombre: nombre,
                    apellidos: apellidos,
                    direccion: direccion,
                    telefono: telefono,
        };

        db.profesor.update(
        {_id: mongo.helper.toObjectID(ProfParam._id)},
        {$set: set},
        function(err){
            if(err) deferred.reject(err);
            
            deferred.resolve();
        });

    return deferred.promise;
}