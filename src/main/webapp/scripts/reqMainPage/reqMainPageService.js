'use strict';

test3hipsterApp.factory('ReqMainPageService', ['$resource',
    function ($resource) {
        return $resource('app/rest/requests/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': { method: 'GET'}
        });
    }]);
