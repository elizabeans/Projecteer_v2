angular.module('projecteer', [
    'ngResource', 
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'ngTagsInput',
    'http-auth-interceptor',
    'ui.router', 
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


angular.module('projecteer')
    .run([
        '$rootScope',
        '$q',
        '$state',
        '$timeout',
        '$location',
        '$cookies',
        function ($rootScope, $q, $state, $timeout, $location, $cookies) {

            // grabs user cookie to see if a user is already logged in
            var grabCookie = function(key) {
                var deferred = $q.defer();

                var user = $cookies.getObject(key);
                if(user) {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            };
   
            grabCookie('user').then(function(user) {
                // if user is already logged in, reassign rootscope user again
                $rootScope.currentUser = user;

            }).catch(function() {
                
                // if user is not authenticated, redirect them back to home

                /*$rootScope.$on('$stateChangeStart', function (event, next) {

                    if(next.name !== 'home') {
                        event.preventDefault();
                        $state.go('home');
                    }               
                });*/
            });
        }]
    );
