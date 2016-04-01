angular.module('projecteer')
    .controller('UserProjectsController', [
        '$rootScope',
        '$scope',
        '$state',
        '$mdDialog',
        'ProjectService',
        'Pusher',
        function ($rootScope, $scope, $state, $mdDialog, projectService, Pusher) {

            $scope.userProjects = [];

            $scope.noProjects = {
                message: ""
            };

            Pusher.subscribe('userProjects', 'deleted', function (project) {

                // A project was deleted. Find it in our list and remove it.
                for (var i = 0; i < $scope.userProjects.length; i++) {

                    if ($scope.userProjects[i]._id === project.id) {
                        $scope.userProjects.splice(i, 1);
                        console.log($scope.userProjects[i]);
                    }
                }
            });

            Pusher.subscribe('userProjects', 'added', function (project) {
                $scope.userProjects.push(project);
            });

            var retrieveProjects = function () {

                projectService.getUserProjects($rootScope.currentUser.username).$promise
                    .then(function (userProjects) {
                        $scope.userProjects = userProjects;
                    });

                if(!($scope.userProjects.length > 0)) {
                    
                    $scope.noProjects.message = "You have no projects! Post some project ideas or go join someone's project!";
                }    
            };

            $scope.deleteProject = function(project) {

                $mdDialog.show({
                    templateUrl: 'project/project-delete-modal.html',
                    controller: 'ProjectDeleteController',
                    locals: { project: project }
                }).then(function(result) {
                    $mdDialog.hide();   // regardless, actual decision is handled by modal controller;
                }, function() {
                    $mdDialog.hide();
                });
            };

            $scope.notifyUser = function () {
                confirm("Would you like to join this project?");
            };

            $scope.closeDialog = function () {
                $mdDialog.hide();
            };
            
            retrieveProjects();
        }]
    );