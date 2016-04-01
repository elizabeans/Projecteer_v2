angular.module('projecteer')
    .controller('DashboardController', [
    '$rootScope',
    '$scope',
    '$state',
    '$mdDialog',
    'ProjectService',
    'Pusher',
    function ($rootScope, $scope, $state, $mdDialog, projectService, Pusher) {

        $scope.projects = [];

        $scope.user = $rootScope.currentUser;

        Pusher.subscribe('projects', 'added', function (project) {
                $scope.projects.push(project);
        });

        var retrieveProjects = function () {

            projectService.getProjects().$promise
                .then(function (projects) {
                    $scope.projects = projects;
                });

        };

        $scope.openNotificationModal = function (project) {
            $mdDialog.show({
                templateUrl: 'notification/notification-modal.html',
                controller: 'NotificationController',
                locals: { project: project }
            }).then(function(result) {
                $mdDialog.hide();   // regardless, actual decision is handled by modal controller;
            }, function() {
                $mdDialog.hide();
            });
        };
        
        retrieveProjects();
    }]
);