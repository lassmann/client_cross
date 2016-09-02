'use strict';

/**
 * @ngdoc function
 * @name video_portal.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the video_portal
 */
angular.module('video_portal')
  .controller('HeaderCtrl', ['$auth', '$http','$state','localStorageService',function ($auth, $http, $state, localStorageService) {
    this.username = localStorageService.get('username').toUpperCase();
    this.logout = function (){
        $auth.logout();
        $state.go('login');
    };
  }]);
