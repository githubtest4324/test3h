'use strict';

test3hipsterApp.controller('OrderController', ['$scope', 'resolvedOrder', 'Order',
    function ($scope, resolvedOrder, Order) {

        $scope.orders = resolvedOrder;

        $scope.create = function () {
            Order.save($scope.order,
                function () {
                    $scope.orders = Order.query();
                    $('#saveOrderModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            $scope.order = Order.get({id: id});
            $('#saveOrderModal').modal('show');
        };

        $scope.delete = function (id) {
            Order.delete({id: id},
                function () {
                    $scope.orders = Order.query();
                });
        };

        $scope.clear = function () {
            $scope.order = {id: null, sampleTextAttribute: null, sampleDateAttribute: null};
        };
    }]);
