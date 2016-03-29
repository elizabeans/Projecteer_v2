angular.module('projecteer')
    .controller('ProjectCreateController', [
    '$scope',
    '$http',
    '$state',
    'ROOT_URL',
    'ProjectService',
    'AccountService',
    function ($scope, $http, $state, ROOT_URL, ProjectService, AccountService) {
        
        $scope.project = {};
        
        $scope.createProject = function (newProjectData) {
            ProjectService.createProject(newProjectData).$promise
                .then(function (data) {
                alert('Project created');
            }).catch(function (err) {
                alert('Something went wrong when trying to create the new project!');
            });
        };
    }]
);