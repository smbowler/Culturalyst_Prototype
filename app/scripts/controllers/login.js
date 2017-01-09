'use strict';

/**
* @ngdoc function
* @name culturalystApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the culturalystApp
*/
angular.module('culturalystApp')
 .controller('LoginCtrl',["$scope", "auth1", "notifications", "$timeout", "$rootScope", function ($scope, auth1, notifications, $timeout, $rootScope) {

 $scope.login = function(){
   console.log('login ctrl');
   auth1.login();
 };

 $scope.fbLogin = function(){
   console.log('YES');
   auth1.login();
 }

 $scope.email = function(user){
   if(user.email || user.password == null){
      notifications.showSimpleToast('entyer');
   }

   console.log(user);
   console.log('new11');
   auth1.email(user.email,user.password);
   $timeout(function(){
    console.log($rootScope.notification);
    notifications.showSimpleToast($rootScope.notification);

   }, 400);
 };

$scope.emailSignin =  function(existingUser){
  console.log('existing');
  console.log(existingUser);
 auth1.emailSignin(existingUser.email,existingUser.password);
  $timeout(function(){
    console.log($rootScope.notification);
    notifications.showSimpleToast($rootScope.notification);

   }, 400);
};




 }]);
