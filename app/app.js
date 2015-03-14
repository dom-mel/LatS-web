'use strict';

angular.module(
    'LatS',
    [
        'ngRoute',
        'LatS.version',
        'LatS.view1',
        'angular-flot'
    ]
).config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
}]);
