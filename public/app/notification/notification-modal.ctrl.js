angular.module('projecteer')
    .controller('NotificationController', [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'NotificationService',
        'project',
        function ($rootScope, $scope, $mdDialog, notificationService, project) {

            $scope.notifySent = false;

            $scope.charLimit = 400;

            $scope.project = project;

            $scope.message = "";

            $scope.viewModel = {
                err: false,
                message: "",
                notifyInProgress: false,
            };

            $scope.closeDialog = function() {
                $mdDialog.hide();
            }

            $scope.notifyUser = function (project) {

                if($scope.notifySent) {
                    $scope.closeDialog();
                    return;
                }

                $scope.viewModel.notifyInProgress = true;

                var newNotification = {
                    fromUsername: $rootScope.currentUser.username,
                    toUsername: project.createdBy,
                    projectName: project.name,
                    message: $scope.message
                };

                notificationService.sendNotification(newNotification).$promise
                    .then(function (data) {
                        $scope.viewModel.message = "Notification Sent!";
                        $scope.viewModel.notifyInProgress = false;
                        $scope.notifySent = true;
                    }).catch(function (err) {
                        $scope.viewModel.err = true;
                        $scope.viewModel.message = "Something went wrong when trying to notify the user. Please try again.";
                        $scope.viewModel.notifyInProgress = false;
                    });
            };

        }]
    );