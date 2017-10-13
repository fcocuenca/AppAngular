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
            return $http.post('/api/profesor/modificarProfesor', prof).then(handleSuccess, handleError);
        }

        function Delete(prof) {
            return $http.post('/api/profesor/borrarProfesor', prof).then(handleSuccess, handleError);
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
