'use strict';

angular.module(
    'LatS',
    [
        'ngRoute',
        'LatS.version',
        'LatS.screen',
        'angular-flot'
    ]
).config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/screen'});
}]);
