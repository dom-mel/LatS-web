'use strict';

angular.module('LatS.screen', ['ngRoute', 'angular-flot'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/screen', {
    templateUrl: 'screen/screen.html',
    controller: 'ScreenCtrl'
  });
}])

    .controller('ScreenCtrl', ['$scope', '$interval', '$http', function($scope, $interval, $http) {

        $scope.chartConfigs = config.charts;


        $scope.charts = [];
        for (var i = 0; i < $scope.chartConfigs.length; i++) {
            $scope.charts.push(
                {
                    dataSet: [ { data: [] } ],
                    options: {
                        legend: { show: false },
                        xaxis: {
                            mode: "time",
                            minTickSize: [1, $scope.chartConfigs[i].tick],
                            max: (new Date().getTime()),
                            min: (new Date().getTime()) - $scope.chartConfigs[i].span
                        }
                    }
                }
            );
        }

        $interval(function () {
            for (var j = 0; j < $scope.chartConfigs.length; j++) {

                (function() {
                    var currentIndex = j;
                    $http({
                        method: 'GET',
                        url: config.host + '/v1/sensors/' + $scope.chartConfigs[j].name,
                        params: {
                            from: parseInt((new Date().getTime() - $scope.chartConfigs[j].span) / 1000)
                        }
                    }).success(function (data) {
                        var values = [];

                            for (var i = 0; i < data.length; i++) {
                                values.push([data[i].date * 1000, data[i].value]);
                            }
                            $scope.charts[currentIndex].dataSet[0].data = values;
                            $scope.charts[currentIndex].options.xaxis.max =
                                (new Date().getTime());
                            $scope.charts[currentIndex].options.xaxis.min =
                                (new Date().getTime()) - $scope.chartConfigs[currentIndex].span;
                        });
                })();
            }
        }, 10000);

    }]);