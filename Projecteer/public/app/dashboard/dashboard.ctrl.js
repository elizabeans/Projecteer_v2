angular.module('projecteer')
    .controller('DashboardController', [
    '$scope',
    '$state',
    'ProjectService',
    'Pusher',
    function ($scope, $state, projectService, Pusher) {

        $scope.projects = [];

        Pusher.subscribe('projects', 'updated', function (project) {

        // A project was updated. Find it in our list and update it.
        for (var i = 0; i < $scope.projects.length; i++) {
            if ($scope.projects[i].id === project.id) {
                $scope.projects[i] = project;
                    break;
                }
            }
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