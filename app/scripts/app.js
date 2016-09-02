'use strict';
/**
 * @ngdoc overview
 * @name video_portal
 * @description
 * # video_portal
 *
 * Main module of the application.
 */
angular
  .module('video_portal', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'ui.router',
    'angular-md5',
    "com.2fdevs.videogular",
    'LocalStorageModule'
  ])
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $authProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'main': {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm',
            resolve: {
              skipIfLoggedIn: skipIfLoggedIn
            }
          }
        }
      })
      .state('home', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'views/header.html',
            controller: 'HeaderCtrl',
            controllerAs: 'vm'
          },
          'main': {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
          }
        },
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('video', {
        url: '/video/:id',
        views: {
          'header': {
            templateUrl: 'views/header.html',
            controller: 'HeaderCtrl',
            controllerAs: 'vm'
          },
          'main': {
            templateUrl: 'views/video.html',
            controller: 'VideoCtrl',
            controllerAs: 'vm'
          }
        },
        resolve: {
          loginRequired: loginRequired
        }
      });

    $urlRouterProvider.otherwise('/');

    $authProvider.httpInterceptor = function () {
      return true;
    };
    $authProvider.baseUrl = 'http://localhost:3000';
    $authProvider.loginUrl = '/user/auth';
    $authProvider.storageType = 'localStorage';

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if (!$auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/');
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  })
  .constant('base', 'http://localhost:3000/');
