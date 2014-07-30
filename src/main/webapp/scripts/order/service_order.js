'use strict';

test3hipsterApp.factory('Order', ['$resource',
    function ($resource) {
        return $resource('app/rest/orders/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': { method: 'GET'}
        });
    }]);
