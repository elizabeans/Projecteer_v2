angular.module('projecteer')
    .controller('DashboardController', [
    '$scope',
    'ProjectService',
    function ($scope, ProjectService) {
        function activate() {
            
            ProjectService.getProjects().$promise
                    .then(function (projects) {
                $scope.projects = projects;
            });
        };
        
        activate();
    }]
);