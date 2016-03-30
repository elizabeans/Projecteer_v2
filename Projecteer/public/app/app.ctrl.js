angular.module('projecteer')
    .controller('AppController', [
    '$rootScope',
    '$scope',
    '$state',
    'ProjectService',
    'AccountService',
    function ($rootScope, $scope, $state, projectService, accountService) {

        $scope.user = $rootScope.currentUser;

        $scope.logout = function () {
            accountService.logout().then(function() {
                $state.go('home'); 
            }).catch(function(err) {
                alert("There was a problem logging out.");
            });
        };

        $scope.project = {};
        
        $scope.createProject = function (newProjectData) {
            projectService.createProject(newProjectData).$promise
                .then(function (data) {
                alert('Project created');
            }).catch(function (err) {
                alert('Something went wrong when trying to create the new project!');
            });
        };

    }]
);