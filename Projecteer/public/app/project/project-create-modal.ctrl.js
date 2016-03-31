angular.module('projecteer')
    .controller('ProjectCreateController', [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'ProjectService',
        function ($rootScope, $scope, $mdDialog, projectService) {

            $scope.projectCreated = false;

            $scope.charLimit = 300;

            $scope.project = {
                name: "",
                description: "",
                tags: []
            };

            $scope.viewModel = {
                err: false,
                message: "",
                createInProgress: false,
            };

            $scope.closeDialog = function() {
                $mdDialog.hide();
            }

            $scope.createProject = function (newProjectData) {

                if($scope.projectCreated) {
                    $scope.closeDialog();
                    return;
                }

                $scope.viewModel.createInProgress = true;

                newProjectData.createdBy = $rootScope.currentUser.username;

                if(!$scope.project.tags.length > 0) {
                    $scope.viewModel.err = "Please enter at least one tag."
                    $scope.viewModel.createInProgress = false;
                    return;
                } else {
                    // resets err if there was one
                    $scope.viewModel.err = ""; 
                }

                projectService.createProject(newProjectData).$promise
                    .then(function (data) {
                        $scope.viewModel.message = "Project successfully created!";
                        $scope.viewModel.createInProgress = false;
                        $scope.projectCreated = true;
                    }).catch(function (err) {
                        $scope.viewModel.err = true;
                        $scope.viewModel.message = "Something went wrong when creating the project. Please try again.";
                        $scope.viewModel.createInProgress = false;
                    });
            };

        }]
    );