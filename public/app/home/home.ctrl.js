angular.module('projecteer')
    .controller('HomeController', [
    '$scope',
    '$state',
    'AccountService',
    function ($scope, $state, accountService) {

        $scope.user = {};
        $scope.login = function (user) {
            accountService.login(user).then(function (resp) {
                $state.go('app.dashboard');
            }).catch(function (err) {
                alert(err);
            });
        };

        $scope.newAccount = {};
        $scope.registerAccount = function (newAccount) {

            if(newAccount.password !== newAccount.confirm_password) {
                $scope.error = "Passwords must match. Please try again";
                return;
            }

            accountService.registerAccount(newAccount).then(function (resp) {
                $state.go('app.dashboard');
            }).catch(function (err) {
                var errObj = JSON.parse(JSON.stringify(err));

                $scope.error = errObj.data.message;
            });
        };

        $(function () {
            $('#login-form-link').click(function (e) {
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });
            $('#register-form-link').click(function (e) {
                $("#register-form").delay(100).fadeIn(100);
                $("#login-form").fadeOut(100);
                $('#login-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });
        });
    }]
);