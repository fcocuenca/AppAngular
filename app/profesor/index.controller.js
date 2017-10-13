(function () {
    'use strict';

    angular
        .module('app')
        .controller('Profesor.IndexController', Controller);

    function Controller(UserService, ProfesorService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.profesores = null;

        vm.profesor=null;

        vm.crearProfesor = crearProfesor;


        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        initControllerProf();
        function initControllerProf() {
            // get current user
            ProfesorService.GetCurrent().then(function (prof) {
                vm.profesores = prof;
            });
        }

        function crearProfesor(){
             vm.profesor.telefono = parseInt(vm.profesor.telefono);

             (ProfesorService.Create(vm.profesor))
             .then(function(){
                FlashService.Success('Profesor insertado correctamente');
             })  
            .catch(function(error){
                 FlashService.Error(error);
            });
        }


    }

})();