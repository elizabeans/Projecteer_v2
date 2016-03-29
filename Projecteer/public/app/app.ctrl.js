angular.module('projecteer')
    .controller('AppController', [
    '$scope',
    '$state',
    'AccountService',
    function ($scope, $state, accountService) {

        $scope.user = accountService.currentUser.data;
        console.log($scope.user);

        $scope.logout = function () {
            accountService.logout().then(function() {
                $state.go('home'); 
            }).catch(function(err) {
                alert("There was a problem logging out.");
            });
        };

    }]
);