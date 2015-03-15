'use strict';

angular.module('LatS.screen', ['ngRoute', 'angular-flot'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/screen', {
    templateUrl: 'screen/main.html',
    controller: 'ScreenCtrl'
  });
}])

.controller('ScreenCtrl', ['$scope', '$interval', '$http', function($scope, $interval, $http) {

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
            $http.get(config.host + '/sensors/UniqueSensorName').
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