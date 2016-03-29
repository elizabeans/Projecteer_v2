angular.module('projecteer', [
    'ngResource', 
    'ui.router', 
    'LocalStorageModule'
]);

angular.module('projecteer')
    .value('ROOT_URL', 'http://localhost:1337');

angular.module('projecteer').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home', 
            templateUrl: '/app/home/home.html', 
            controller: 'HomeController'

        }).state('register', {
            url: '/register', 
            templateUrl: '/app/register/register.html', 
            controller: 'RegisterController'

        }).state('app', {
            url: '/app', 
            templateUrl: '/app/app.html', 
            controller: 'AppController'
    
        }).state('app.dashboard', {
            url: '/dashboard', 
            templateUrl: '/app/dashboard/dashboard.html', 
            controller: 'DashboardController'

        }).state('app.project', {
            url: '/project', 
            abstract: true, 
            template: '<ui-view>'
        
        }).state('app.project.create', {
            url: '/new', 
            templateUrl: '/app/project/project.html', 
            controller: 'ProjectCreateController'
        });
});