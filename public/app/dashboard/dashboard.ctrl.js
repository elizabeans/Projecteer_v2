angular.module('projecteer')
    .controller('DashboardController', [
    '$scope',
    '$state',
    'ProjectService',
    'Pusher',
    function ($scope, $state, projectService, Pusher) {

        $scope.projects = [];

        Pusher.subscribe('projects', 'added', function (project) {
                $scope.projects.push(project);
        });


        var retrieveProjects = function () {

            projectService.getProjects().$promise
                .then(function (projects) {
                    $scope.projects = projects;
                });

        };

        $scope.notifyUser = function () {
            confirm("Would you like to join this project?");
        };
        
        retrieveProjects();
    }]
);