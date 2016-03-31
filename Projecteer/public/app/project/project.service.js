angular.module('projecteer')
    .factory('ProjectService', [
        '$resource',
        'ROOT_URL',
        function ($resource, ROOT_URL) {

            var resource = $resource(
                ROOT_URL + '/project', {}, {

                    getProject: {
                        url: ROOT_URL + '/project/detail/:id',
                        method: 'GET'
                    },

                    getProjects: {
                        url: ROOT_URL + '/project/all',
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
                getProject: function (projectId) {
                    return resource.getProject({ id: projectId });
                },

                getProjects: function () {
                    return resource.getProjects();
                },

                createProject: function (newProjectData) {
                    return resource.createProject(newProjectData);
                }
            };
        }]
    );