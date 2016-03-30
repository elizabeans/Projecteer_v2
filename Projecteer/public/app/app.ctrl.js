angular.module('projecteer')
    .controller('AppController', [
    '$rootScope',
    '$scope',
    '$state',
    'ProjectService',
    'AccountService',
    'TagService',
    function ($rootScope, $scope, $state, projectService, accountService) {

        $scope.user = $rootScope.currentUser;

        $scope.logout = function () {
            accountService.logout().then(function() {
                $state.go('home'); 
            }).catch(function(err) {
                alert("There was a problem logging out.");
            });
        };

        $scope.project = {
            tags: []
        };
        
        $scope.createProject = function (newProjectData) {
            newProjectData.createdBy = $rootScope.currentUser.username;

            projectService.createProject(newProjectData).$promise
            .then(function (data) {
                alert('Project created');

            }).catch(function (err) {
                alert('Something went wrong when trying to create the new project!');
            });
        };
    }]
);