// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.logout', {
      url: "/logout",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.recommendedads', {
      url: "/recommendedads",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'RecommendedAdsCtrl'
        }
      }
    })


    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.playlists2', {
      url: "/playlists2",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists2.html",
          controller: 'PlaylistsCtrl2'
        }
      }
    })

   .state('app.myads', {
        url: "/myads",
        views: {
          'menuContent' :{
            templateUrl: "templates/myads.html",
            controller: 'MyAdsCtrl'
          }
        }
      })

      .state('app.search', {
        url: "/search",
        views: {
          'menuContent' :{
            templateUrl: "templates/range.html",
            controller: 'SearchCtrl'
          }
        }
      })

      .state('app.addads', {
        url: "/addads",
        views: {
          'menuContent' :{
            templateUrl: "templates/addads.html",
            controller: 'AddCtrl'
          }
        }
      })

      .state('app.about', {
        url: "/about",
        views: {
          'menuContent' :{
            templateUrl: "templates/about.html",
            controller: 'About'
          }
        }
      })


    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
  //$urlRouterProvider.otherwise('/app/playlists');

});

