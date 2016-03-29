angular.module('projecteer')
    .controller('HomeController', [
    '$scope',
    '$state',
    'localStorageService',
    'AccountService',
    function ($scope, $state, localStorageService, accountService) {

        $scope.user = {};
        $scope.login = function (user) {
            accountService.login(user).then(function (resp) {
                console.log("LOGGED IN!");

                localStorageService.set('token', {
                    token: resp.token
                });
                
                localStorageService.set('user', {
                    user: resp.user
                });
                
                $state.authorized = true;

                $state.go('app.dashboard');
            }).catch(function (err) {
                alert(err);
            });
        };
        
        $scope.newAccount = {};  
        $scope.registerAccount = function (newAccount) {
            
        accountService.registerAccount(newAccount).$promise.then(function (resp) {
                $state.go('app.dashboard');
            }).catch(function (err) {
                alert(err);
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