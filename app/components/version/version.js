'use strict';

angular.module('LatS.version', [
  'LatS.version.interpolate-filter',
  'LatS.version.version-directive'
])

.value('version', '0.1');
