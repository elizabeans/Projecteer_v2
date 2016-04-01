angular.module('projecteer')
    .factory('TagService', [
        '$resource',
        'ROOT_URL',
        function ($resource, ROOT_URL) {

            var resource = $resource(
                ROOT_URL + '/project', {}, {
                    getTags: {
                        url: ROOT_URL + '/tags',
                        method: 'GET',
                        isArray: true
                    },

                    update: {
                        method: 'PUT'
                    }
                }
            );

            return {
                getTags: function () {
                    return resource.getTags();
                }
            };
        }]
    );