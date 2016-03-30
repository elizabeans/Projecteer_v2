angular.module('projecteer')

    .factory('AccountService', [
    '$rootScope',
    '$resource',
    '$q',
    '$cookies',
    'ROOT_URL',
    function ($rootScope, $resource, $q, $cookies, ROOT_URL) {
        
        $rootScope.currentUser = $cookies.getObject('user');

        var resource = $resource(
            ROOT_URL + '/account', {}, {
                
                login: {
                    url: ROOT_URL + '/account/login',
                    method: 'POST'
                },
                
                logout: {
                    url: ROOT_URL + '/account/logout',
                    method: 'GET'
                },

                registerAccount: {
                    url: ROOT_URL + '/account/register',
                    method: 'POST'
                }
            }
        );

        return {

            login: function (user) {
                
                var deferred = $q.defer();
                
                resource.login(user).$promise.then(function (resp) {

                    $rootScope.currentUser = resp.data;
                    $cookies.putObject('user', resp.data, { expires: new Date(resp.data.expires) });
                    deferred.resolve(resp.data);

                }).catch(function (err) {
                    deferred.reject(err);
                });
                
                return deferred.promise;
            },
            
            logout: function() {
                var deferred = $q.defer();
                
                resource.logout().$promise.then(function (resp) {
                    
                    $rootScope.currentUser = null;
                    $cookies.remove('user');
                    deferred.resolve(resp);

                }).catch(function (err) {
                    deferred.reject(err);
                });
                
                return deferred.promise;
            },

            registerAccount: function (newAccountData) {
                return resource.registerAccount(newAccountData);
            }
        };
    }]
);

