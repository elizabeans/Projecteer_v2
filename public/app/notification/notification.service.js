angular.module('projecteer')
    .factory('NotificationService', [
        '$resource',
        'ROOT_URL',
        function ($resource, ROOT_URL) {

            var resource = $resource(
                ROOT_URL + '/notification', {}, {

                    getUserNotifications: {
                        url: ROOT_URL + '/notification/user/:username',
                        method: 'GET',
                        isArray: true
                    },

                    sendNotification: {
                        method: 'POST'
                    }
                }
            );

            return {

                getUserNotifications: function (username) {
                    return resource.getUserNotifications({ username: username });
                },

                sendNotification: function (notificationPayload) {
                    return resource.sendNotification(notificationPayload);
                }
            };
        }]
    );