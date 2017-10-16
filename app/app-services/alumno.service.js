(function () {
    'use strict';

    angular
        .module('app')
        .factory('AlumnoService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/alumno/currentAlumno').then(handleSuccess, handleError);
        }

        function Create(alum) {
            return $http.post('/api/alumno/crearAlumno', alum).then(handleSuccess, handleError);
        }

        function Update(alum) {
            return $http.post('/api/alumno/modificarAlumno', alum).then(handleSuccess, handleError);
        }

        function Delete(alum) {
            return $http.post('/api/alumno/borrarAlumno', alum).then(handleSuccess, handleError);
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
