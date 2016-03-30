angular.module('projecteer')
    .controller('DashboardController', [
    '$scope',
    'ProjectService',
    function ($scope, projectService) {
        function activate() {
            
            projectService.getProjects().$promise
                .then(function (projects) {
                    console.log(projects);
                    $scope.projects = projects;
                });
        };
        
        activate();
    }]
);