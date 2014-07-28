'use strict';

test3hipsterApp
    .config(['$routeProvider', '$httpProvider', '$translateProvider', 'USER_ROLES',
        function ($routeProvider, $httpProvider, $translateProvider, USER_ROLES) {
            $routeProvider
                .when('/order', {
                    templateUrl: 'views/orders.html',
                    controller: 'OrderController',
                    resolve:{
                        resolvedOrder: ['Order', function (Order) {
                            return Order.query();
                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
        }]);
