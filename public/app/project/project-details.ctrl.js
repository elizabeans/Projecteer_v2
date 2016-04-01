angular.module('projecteer')
    .controller('ProjectDetailsController', [
	    '$scope',
	    '$state',
	    'ProjectService',
	    function ($scope, $state, projectService) {

	    	$scope.project = {};

	    	projectService.getProject($state.params.projectId).$promise
	    		.then(function(project) {
	    			$scope.project = project;
	    		});

	    }]
);