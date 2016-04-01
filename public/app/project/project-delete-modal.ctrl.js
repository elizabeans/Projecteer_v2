angular.module('projecteer')
    .controller('ProjectDeleteController', [
        '$rootScope',
        '$scope',
        '$mdDialog',
        'ProjectService',
        'project',
        function ($rootScope, $scope, $mdDialog, projectService, project) {

            $scope.projectDeleted = false;

            $scope.project = project;

            $scope.viewModel = {
                err: false,
                message: "",
                deleteInProgress: false,
            };

            $scope.closeDialog = function() {
                $mdDialog.hide();
            }

            $scope.deleteProject = function (project) {

                if($scope.projectDeleted) {
                    $scope.closeDialog();
                    return;
                }

                $scope.viewModel.deleteInProgress = true;

                projectService.deleteProject(project._id).$promise
                    .then(function (resp) {
                        $scope.viewModel.message = "Project successfully deleted.";
                        $scope.viewModel.deleteInProgress = false;
                        $scope.projectDeleted = true;
                    }).catch(function (err) {
                        $scope.viewModel.err = true;
                        $scope.viewModel.message = "Something went wrong when deleting the project. Please try again.";
                        $scope.viewModel.deleteInProgress = false;
                    });
            };

        }]
    );