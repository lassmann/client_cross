'use strict';

/**
 * @ngdoc function
 * @name video_portal.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the video_portal
 */
angular.module('video_portal')
  .controller('LoginCtrl', ['$auth', 'md5', '$state', 'localStorageService',function ($auth, md5, $state, localStorageService) {
    var self = this;
    self.user = {};

    self.login = function () {
      var user = {
        username: self.user.username,
        password: md5.createHash(self.user.password)
      };
      $auth.login(user).then(function (response) {
        $auth.setToken(response.data.sessionId);
        localStorageService.set('username', self.user.username);
        console.log("OK ", response);
      }).catch(function (error) {
        console.log("It was a mistake" , error.message);
        self.user = {};
      }).finally(function () {
        self.user = {};
        $state.go('home');
      })
    }
  }]);
