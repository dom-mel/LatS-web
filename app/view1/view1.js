'use strict';

angular.module('LatS.view1', ['ngRoute', 'angular-flot'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$interval', function($scope, $interval) {

        var now = (new Date()).getTime();
        $scope.dataset = [
            {
                data: [
                    [now, 0]
                ]
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
            x++;
            if (x > 360) {
                x = 0;
            }
            $scope.dataset[0].data.push([(new Date()).getTime(), ( Math.sin(x)) ]);
            var now = (new Date()).getTime();
            $scope.options.xaxis.min = now - 10000;
            if ($scope.dataset[0].data.length > 11) {
                $scope.dataset[0].data.splice(0, 1);
            }
        }, 1000);

    }]
);