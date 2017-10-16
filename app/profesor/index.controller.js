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
        vm.profesorMod=null;

        vm.crearProfesor = crearProfesor;
        vm.borrarProfesor = borrarProfesor;
        vm.editarProfesor = editarProfesor;
        vm.getIndex = getIndex;

        var indice;

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

        function borrarProfesor(index){
        angular.forEach(vm.profesores, function(value, key){
            if(index === key)
            {
                ProfesorService.Delete(vm.profesores[key])
                .then(function () {
                    FlashService.Success('Profesor borrado correctamente');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
            } 
       });
    }
    
    function getIndex(index){
         vm.profesorMod = vm.profesores[index];
    }

    function editarProfesor(index){

            vm.profesorMod.telefono = parseInt(vm.profesorMod.telefono);
       
            vm.profesores[index] = vm.profesorMod;


                ProfesorService.Update(vm.profesores[index])
                .then(function () {
                    FlashService.Success('El requisito funcional se ha modificado correctamente');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });    
    }

}

})();