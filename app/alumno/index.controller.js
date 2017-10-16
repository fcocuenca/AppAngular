(function () {
    'use strict';

    angular
        .module('app')
        .controller('Alumno.IndexController', Controller);

    function Controller(FlashService, AlumnoService) {
        var vm = this;

        vm.alumnos = null;

        vm.alumno=null;
        vm.alumnoMod=null;

        vm.crearAlumno = crearAlumno;
        vm.borrarAlumno = borrarAlumno;
        vm.editarAlumno = editarAlumno;
        vm.getIndex = getIndex;

        var indice;

        initControllerAlum();
        function initControllerAlum() {
            // get current user
            AlumnoService.GetCurrent().then(function (alum) {
                vm.alumnos = alum;
            });
        }

        function crearAlumno(){
             vm.alumno.telefono = parseInt(vm.alumno.telefono);

             (AlumnoService.Create(vm.alumno))
             .then(function(){
                FlashService.Success('Alumno insertado correctamente');
             })  
            .catch(function(error){
                 FlashService.Error(error);
            });
        }

        function borrarAlumno(index){
        angular.forEach(vm.alumnos, function(value, key){
            if(index === key)
            {
                AlumnoService.Delete(vm.alumnos[key])
                .then(function () {
                    FlashService.Success('Alumno borrado correctamente');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
            } 
       });
    }
    
    function getIndex(index){
         vm.alumnoMod = vm.alumnos[index];
    }

    function editarAlumno(index){

            vm.alumnoMod.telefono = parseInt(vm.alumnoMod.telefono);
       
            vm.alumnos[index] = vm.alumnoMod;

            AlumnoService.Update(vm.alumnos[index])
            .then(function () {
                FlashService.Success('Alumno modificado correctamente');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });    
    }

}

})();