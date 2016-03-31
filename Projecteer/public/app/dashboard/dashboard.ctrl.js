angular.module('projecteer')
    .controller('DashboardController', [
    '$scope',
    '$state',
    'ProjectService',
    function ($scope, $state, projectService) {

        function initializeDashboard() {

            projectService.getProjects().$promise
                .then(function (projects) {
                    $scope.projects = projects;
                });
        };

        $scope.notifyUser = function () {
            confirm("Would you like to join this project?");
        };
        
        initializeDashboard();
    }]
);