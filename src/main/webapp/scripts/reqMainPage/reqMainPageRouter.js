'use strict';

test3hipsterApp
    .config(['$routeProvider', '$httpProvider', '$translateProvider', 'USER_ROLES',
        function ($routeProvider, $httpProvider, $translateProvider, USER_ROLES) {
            $routeProvider
                .when('/requestMainFilter', {
                    templateUrl: 'views/requestMainFilter.html',
                    controller: 'reqMainPageController',
                    resolve:{
//                        resolvedOrder: ['RequestMainFilter', function (RequestMainFilter) {
//                            return RequestMainFilter.query();
//                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
        }]);
