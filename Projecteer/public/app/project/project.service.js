angular.module('projecteer')
    .factory('ProjectResource', [
        '$resource',
        'ROOT_URL',
        function ($resource, ROOT_URL) {

            var resource = $resource(
                ROOT_URL + '/projects', {}, {
                    getProjects: {
                        method: 'GET',
                        isArray: true
                    },

                    createProject: {
                        method: 'POST'
                    },

                    update: {
                        method: 'PUT'
                    }
                }
            );

            return {
                getProjects: function () {
                    return resource.getProjects();
                },

                createProject: function (newProjectData) {
                    return resource.createProject(newProjectData);
                }
            };
        }]
    );