'use strict';

/**
 * @ngdoc function
 * @name video_portal.controller:HomeCtrl
 * @description
 * # AboutCtrl
 * Controller of the video_portal
 */
angular.module('video_portal')
  .controller('HomeCtrl', ['$auth', '$sce', '$http', 'base', function ($auth, $sce, $http, base) {
    var self = this;
    self.videos = [];
    self.config = {
      sources: [],
      theme: {
        url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
      }
    };

    self.loadMoreVideos = function (){
      console.log("entro" );
    };

    self.play = function (video) {
      self.config.sources = [({
        src: $sce.trustAsResourceUrl(video.src),
        type: "video/mp4"
      })];
    };

    self.error = function (err) {

    };

    $http({
      method: 'GET',
      url: base.concat('videos/?sessionId=').concat($auth.getToken())
    }).then(function (res) {
      res.data.data.forEach(function Iterator(video) {
        self.videos.push({
          id: video._id,
          src: base.concat(video.url),
          name: video.name,
          description: video.description,
          sources: [
            {
              src: $sce.trustAsResourceUrl(base.concat(video.url)),
              type: "video/mp4"
            }
          ]
        })
      });
    }, function (err) {
      console.log("It was a mistake: ", err.message);
    })
  }]);
