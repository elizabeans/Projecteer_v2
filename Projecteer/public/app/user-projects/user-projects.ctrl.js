angular.module('projecteer')
    .controller('UserProjectsController', [
        '$rootScope',
        '$scope',
        '$state',
        '$mdDialog',
        'AccountService',
        'TagService',
        function ($rootScope, $scope, $state, $mdDialog, accountService, tagService) {

            $scope.viewModel = {
                err: ""
            };

            $scope.user = $rootScope.currentUser;

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
        }]
    );