angular.module('projecteer')
    .controller('AppController', [
    '$scope',
    '$state',
    'localStorageService',
    'AccountService',
    function ($scope, $state, localStorageService, accountService) {

        $scope.user = accountService.currentUser.data;

        $scope.logout = function () {
            accountService.logout().then(function () {
                localStorageService.remove('token');
                localStorageService.remove('user');
                state.authorized = false;

                $state.go('home'); 
            }).catch(function(err) {
                alert("There was a problem logging out.");
            });
        };

    }]
);