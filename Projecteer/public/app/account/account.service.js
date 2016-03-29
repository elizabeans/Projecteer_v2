angular.module('projecteer')

    .factory('AccountService', [
    '$resource',
    '$q',
    'ROOT_URL',
    function ($resource, $q, ROOT_URL) {
        
        this.currentUser = {
            data: {}
        };

        var that = this;

        var resource = $resource(
            ROOT_URL + '/account', {}, {
                
                login: {
                    url: ROOT_URL + '/account/login',
                    method: 'POST'
                },
                
                logout: {
                    url: ROOT_URL + '/logout',
                    method: 'GET'
                },

                registerAccount: {
                    url: ROOT_URL + '/account/register',
                    method: 'POST'
                }
            }
        );

        return {
            currentUser: this.currentUser,

            login: function (user) {
                
                var deferred = $q.defer();
                
                resource.login(user).$promise.then(function (resp) {
                    console.log(resp);
                    that.currentUser.data = resp.data;
                    deferred.resolve(resp.data);

                }).catch(function (err) {
                    deferred.reject(err);
                });
                
                return deferred.promise;
            },
            
            logout: function() {
                var deferred = $q.defer();
                
                resource.logout().$promise.then(function (resp) {
                    that.currentUser.data = {};
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

