angular.module('projecteer', [
    'ngResource', 
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'ngTagsInput',
    'http-auth-interceptor',
    'ui.router', 
    'ngMaterial',
    'ngFileUpload',
    'doowb.angular-pusher'
]);

angular.module('projecteer')
    .value('ROOT_URL', 'http://localhost:1337');

angular.module('projecteer')
    .factory('httpErrorInterceptor', [
        '$q', 
        '$rootScope', 
        '$location',
        '$timeout',
        function ($q, $rootScope, $location, $timeout) {
            return {
                request: function (config) {
                    return config || $q.when(config);
                },
                requestError: function(request){
                    return $q.reject(request);
                },
                response: function (response) {
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    if (response && response.status === 401 || response.status === 404) {
                        
                        $timeout(function() {
                            $location.path('#/home');
                        });

                        return $q.reject(response);
                    }
                    if (response && response.status >= 500) {
                    }
                    return $q.reject(response);
                }
            };
        }]);

angular.module('projecteer')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpErrorInterceptor');    
    }]);

angular.module('projecteer')
    .config(['PusherServiceProvider',
        function(PusherServiceProvider) {
        PusherServiceProvider
            .setToken('24242171b74120385a82')
            .setOptions({});
    }
]);

angular.module('projecteer')
    .config([
        '$httpProvider',
        '$stateProvider',
        '$urlRouterProvider',
        function ($httpProvider, $stateProvider, $urlRouterProvider) {

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
                    url: '/project/details/{projectId}', 
                    templateUrl: '/app/project/project-details.html',
                    controller: 'ProjectDetailsController'
                
                }).state('app.profile', {
                    url: '/profile',
                    templateUrl: '/app/profile/profile.html',
                    controller: 'ProfileController'
                });
    }]);

angular.module('projecteer')
    .run([
        '$rootScope',
        '$q',
        '$state',
        '$timeout',
        '$location',
        '$cookies',
        'AccountService',
        function ($rootScope, $q, $state, $timeout, $location, $cookies, accountService) {

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
              
            });

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                if(toState.name !== 'home' || fromState.name !== 'home') {
                    accountService.getIsAuthenticated();
                }  
            });
        }]
    );
