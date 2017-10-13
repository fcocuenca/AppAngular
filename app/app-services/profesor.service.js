(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProfesorService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/profesor/currentProf').then(handleSuccess, handleError);
        }

        function Create(prof) {
            return $http.post('/api/profesor/crearProfesor', prof).then(handleSuccess, handleError);
        }

        function Update(prof) {
            return $http.put('/api/profesor/modificarprofesor/' + prof._id, prof).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/profesor/borrarprofesor/' + _id).then(handleSuccess, handleError);
        }

        // private functions
        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
