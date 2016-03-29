angular.module('projecteer')
    .controller('DashboardController', [
    '$scope',
    'ProjectResource',
    function ($scope, ProjectResource) {
        function activate() {
            
            ProjectResource.getProjects().$promise
                    .then(function (projects) {
                $scope.projects = projects;
            });
        };
        
        activate();
    }]
);