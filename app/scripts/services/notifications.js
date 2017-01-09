'use strict';
/**
 * @ngdoc service
 * @name culturalystApp.notifications
 * @description
 * # notifications
 * Factory in the culturalystApp.
 */
angular.module('culturalystApp')
  .factory('notifications', function ($mdToast) {
    // Service logic
    // ...
    var meaningOfLife = 42;
    // Public API here
    return {
  showSimpleToast : function(message) {
    var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };
var toastPosition = angular.extend({},last);
var getToastPosition = function() {
  sanitizePosition();
  return Object.keys(toastPosition)
    .filter(function(pos) { return toastPosition[pos]; })
    .join(' ');
};
function sanitizePosition() {
  var current = toastPosition;
  if ( current.bottom && last.top ) current.top = true;
  if ( current.top && last.bottom ) current.bottom = false;
  if ( current.right && last.left ) current.left = false;
  if ( current.left && last.right ) current.right = true;
  last = angular.extend({},current);
}
    var pinTo = getToastPosition();
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position(pinTo )
        .hideDelay(3000)
    );
  }
    };
  });