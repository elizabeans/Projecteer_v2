angular.module('projecteer')
    .controller('ProfileController', [
    '$rootScope',
    '$scope',
    '$http',
    '$state',
    'Upload',
    function ($rootScope, $scope, $http, $state, uploadService) {

		// upload later on form submit or something similar
		$scope.submit = function() {
			if ($scope.form.file.$valid && $scope.file) {
				$scope.upload($scope.file);
			}
		};

		// upload on file select or drop
		$scope.upload = function (file) {
			Upload.upload({
			    url: 'profile/image',
			    data: {file: file, 'username': $rootScope.currentUser.username}
			}).then(function (resp) {
			    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			}, function (resp) {
			    console.log('Error status: ' + resp.status);
			}, function (evt) {
			    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		};

    }]
);