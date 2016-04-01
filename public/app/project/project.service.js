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

                    getUserProjects: {
                        url: ROOT_URL + '/project/user/:username',
                        method: 'GET',
                        isArray: true
                    },

                    createProject: {
                        method: 'POST'
                    },

                    update: {
                        method: 'PUT'
                    },

                    deleteProject: {
                        url: ROOT_URL + '/project/user/:id',
                        method: 'DELETE'
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

                getUserProjects: function (username) {
                    return resource.getUserProjects({ username: username });
                },

                createProject: function (newProjectData) {
                    return resource.createProject(newProjectData);
                },

                updateProject: function (updatedProjectData) {
                    return resource.updateProject(updatedProjectData);
                },

                deleteProject: function (projectId) {
                    return resource.deleteProject({ id: projectId });
                }
            };
        }]
    );