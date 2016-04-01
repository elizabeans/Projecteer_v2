angular.module('projecteer')
    .controller('AppController', [
        '$rootScope',
        '$scope',
        '$state',
        '$mdDialog',
        'Pusher',
        'AccountService',
        'NotificationService',
        'TagService',
        function ($rootScope, $scope, $state, $mdDialog, Pusher, accountService, notificationService, tagService) {

            $scope.notifications = [];

            $scope.viewModel = {
                err: ""
            };

            $scope.user = $rootScope.currentUser;

            Pusher.subscribe('notification', 'added', function (notification) {

                if(notification.toUsername === $rootScope.currentUser.username) {
                    $scope.notifications.push(notification);
                }
            });

            var getUserNotifications = function() {
                notificationService.getUserNotifications($rootScope.currentUser.username).$promise
                    .then(function(notifications) {
                        $scope.notifications = notifications;
                        console.log(notifications);
                    });
            };

            $scope.logout = function () {
                accountService.logout().then(function() {
                    $state.go('home'); 
                }).catch(function(err) {
                    alert("There was a problem logging out.");
                });
            };

            $scope.openCreateProjectModal = function () {
                $mdDialog.show({
                    templateUrl: 'project/project-create-modal.html',
                    controller: 'ProjectCreateController'
                }).then(function(result) {
                    $mdDialog.hide();   // regardless, actual decision is handled by modal controller;
                }, function() {
                    $mdDialog.hide();
                });

            };

            getUserNotifications();
        }]
    );