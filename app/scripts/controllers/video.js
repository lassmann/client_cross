'use strict';

/**
 * @ngdoc function
 * @name video_portal.controller:VideoCtrl
 * @description
 * # VideoCtrl
 * Controller of a Specific Video in video_portal. It receives the id by URL
 */
angular.module('video_portal')
  .controller('VideoCtrl', ['$auth', '$sce','$stateParams', 'base','$http' ,function ($auth, $sce, $stateParams, base, $http) {
    var self = this;
    this.id = $stateParams.id;


    $http({
      method: 'GET',
      url: base + 'video?sessionId='+ $auth.getToken() + '&videoId=' + $stateParams.id
    }).then(function (res){
      var video = res.data.data;
      self.video = {
        src: base.concat(video.url),
        name: video.name,
        sources: [
          {
            src: $sce.trustAsResourceUrl(base.concat(video.url)),
            type: "video/mp4"
          }
        ]
      }
    })
    
  }]);
