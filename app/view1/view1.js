'use strict';

angular.module('LatS.view1', ['ngRoute', 'angular-flot'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$interval', '$http', function($scope, $interval, $http) {

        $scope.dataset = [
            {
                data: []
            }
        ];

        $scope.options = {
            legend: {
                show: false
            },
            xaxis: {
                mode: "time",
                minTickSize: [1, "second"]
            }
        };

        var x = 0;
        $interval(function() {
            $http.get(config.host + '/sensor/UniqueSensorName').
                success(function (data, status, headers, config) {

                    var values = [];

                    for (var i = 0; i < data.length; i++) {
                        values.push([data[i].date, data[i].value]);
                    }
                    $scope.dataset[0].data = values;
                });
        }, 3000);

    }]
);