(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('profesor', {
                url: '/profesor',
                templateUrl: 'profesor/index.html',
                controller: 'Profesor.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'profesor' }
            })
             .state('addProfesor',{
                url:'/addProfesor',
                templateUrl:'profesor/add.html',
                controller:'Profesor.IndexController',
                controllerAs:'vm',
                data:{activeTab: 'profesor'}
            })
             .state('alumno', {
                url: '/alumno',
                templateUrl: 'alumno/index.html',
                controller: 'Alumno.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'alumno' }
            })
             .state('addAlumno',{
                url:'/addAlumno',
                templateUrl:'alumno/add.html',
                controller:'Alumno.IndexController',
                controllerAs:'vm',
                data:{activeTab: 'alumno'}
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();