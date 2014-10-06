angular.module('starter.controllers', [])
//-----------------------------------------------------------------------------------------------------------------------------------
.controller('AppCtrl', function($scope, $rootScope) {
              $scope.name =  $rootScope.nameuser
})
//-----------------------------------------------------------------------------------------------------------------------------------
//Control encargado de realizar el login
.controller('LoginCtrl', function($scope,$location,$rootScope,$ionicLoading) {
              $scope.login = function () { 
                    OAuth.initialize('OaSntgOItRIe0VyBCBTd-yt_sI4');
                    var provider = 'facebook';
                    OAuth.popup(provider)
                    .done(function(result) {
                        result.me()
                        .done(function (user_info){
                          //alert(JSON.stringify(user_info));
                          $rootScope.nameuser=user_info.name;
                          $rootScope.email=user_info.email;
                          $scope.show();
                        })
                        .fail(function (err) {
                            //handle error with err
                        });
                    })
                    .fail(function (err) {
                        //handle error with err
                    });
              };
            
              $scope.logintwitter = function () {   
                    OAuth.initialize('OaSntgOItRIe0VyBCBTd-yt_sI4');
                    var provider = 'twitter';

                    OAuth.popup(provider)
                    .done(function(result) {
                        result.me()
                        .done(function (response) {
                          //alert(JSON.stringify(response));
                          $rootScope.name=response.name;
                          $rootScope.email=response.alias+"@twitter.com";
                          $scope.show();
                        })
                        .fail(function (err) {
                            //handle error with err
                        });
                    })
                    .fail(function (err) {
                        //handle error with err
                    });
              };

              $scope.show = function() {
                  $ionicLoading.show({
                  template: 'Loading...', duration: 20000});
                  $location.url("/app/playlists");
              };

              $scope.hide = function(){
                  $ionicLoading.hide();
              }
})
//-----------------------------------------------------------------------------------------------------------------------------------
//Control encargado de agregar un add a la app
.controller('AddCtrl', function($scope,$location,$rootScope,$ionicLoading,$timeout) {
              $scope.add = {};

             $scope.promiseCtrl= function ($scope, $timeout) {
                $scope.result = $timeout(function(){ return "Go!"; }, 90000);
              }

              $scope.addAd = function() {      
                    
                    Parse.initialize("KMqDVxUyDJICF5VE1kZ6AEs115e8vanGYHo06nX8", "qNVtqdmtJYXrlImikj8TTh63Qr1pbnKgFou6QU7i");
                    var pictures = Parse.Object.extend("Pictures");
                    var query = new pictures();

                    var direccion;
                    var smallImage = document.getElementById('imagen');
                    //ar urld = encodeURIComponent($rootScope.imgcamara);
                    var scoree=0;
                    direccion = "http://smartshopping.herokuapp.com/createMyAdds?title="+$scope.add.title+"&text="+$scope.add.description+"&costo="+$scope.add.price+"&email="+$rootScope.email+"&direccion="+$scope.add.location+"&tag_list="+$scope.add.tags+"&score="+scoree;//+"&pic="+$rootScope.imgcamara;//+"&pic="+$scope.add.image;
                    
                    $.ajax({
                        url: direccion,
                    }).then(function(data) {
                        var name = "photoimage.jpg";
                        var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
                        var photo = $rootScope.imgcamara;
                        alert(photo);
                        var parseFile= new Parse.File(name, { base64: photo });
                        query.set("Image", parseFile);
                        query.set("Id",data.id);
                        query.save();
                    });

                    //$scope.show();
                    //$location.url("/app/playlists");//+id.id);

              //-------------------------------------------------------------------------------------
                    /*
                    $scope.promiseCtrl($scope,$timeout);

                    Parse.initialize("KMqDVxUyDJICF5VE1kZ6AEs115e8vanGYHo06nX8", "qNVtqdmtJYXrlImikj8TTh63Qr1pbnKgFou6QU7i");
                    var pictures = Parse.Object.extend("Pictures");
                    var query = new pictures();


                    //alert("salio");
                    //alert(JSON.stringify($scope.numeroarticle.id));
  

                    
                    var name = "photoimage.jpg";
                    var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
                    var photo = $rootScope.imgcamara;
                    alert(photo);
                    var parseFile= new Parse.File(name, { base64: photo });
                    query.set("Image", parseFile);
                    //query.set("Id",$scope.numeroarticle.id);
                    query.save();
                    */

                    $scope.show();
                    $location.url("/app/playlists");//+id.id);
                    //$scope.show();
                    //$location.url("/app/playlists");//+id.id);

              //-------------------------------------------------------------------------------------     

              };

              var pictureSource;   // picture source----
              var destinationType; // sets the format of returned value

              pictureSource=navigator.camera.PictureSourceType;
              destinationType=navigator.camera.DestinationType;
              //-----------------------------------GPS----------------------------------------------
              $scope.getLocation =function(){
                navigator.geolocation.getCurrentPosition($scope.onSuccesss, $scope.onErrorr);
              }
              
              $scope.onSuccesss=function(position) {
                $.ajax({
                    url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&sensor=true_or_false"
                 }).then(function(data) {
                      var location = " ";
                      for(var i=0;i<data.results[1].address_components.length;i++) {
                            location = location + data.results[1].address_components[i].long_name + "  ";
                      }
                      $scope.add.location = location;
                 });
               }

               $scope.onErrorr=function(error) {
                  alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
               }
              //---------------------------------Camara----------------------------------------------
              $scope.onPhotoDataSuccess = function(imageData) {

                  $rootScope.imgcamara=imageData;
                  var smallImage = document.getElementById('imagen');
                  smallImage.style.display = 'block';
                  smallImage.src = "data:image/jpeg;base64," + imageData;
              };

              $scope.onPhotoURISuccess=function(imageURI) {
                  $rootScope.imgcamara=imageURI;
                  var largeImage = document.getElementById('imagen');
                  largeImage.style.display = 'block';
                  largeImage.src = imageURI;
              };

              $scope.capturePhoto=function() {
                  navigator.camera.getPicture($scope.onPhotoDataSuccess, $scope.onFail, { quality: 50,destinationType: destinationType.DATA_URL });
              };

              $scope.capturePhotoEdit=function() {
                // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
                  navigator.camera.getPicture($scope.onPhotoDataSuccess, $scope.onFail, { quality: 20, allowEdit: true,destinationType: destinationType.DATA_URL });
              };

              $scope.getPhoto=function(source) {
                // Retrieve image file location from specified source
                  navigator.camera.getPicture($scope.onPhotoURISuccess, $scope.onFail, { quality: 50,destinationType: destinationType.FILE_URI,sourceType: source });
              };

                // Called if something bad happens.
              $scope.onFail=function(message) {
                  alert('Failed because: ' + message);
              };

              $scope.show = function() {
                  $ionicLoading.show({  template: 'Loading...', duration: 10000});
              };

              $scope.hide = function(){
                  $ionicLoading.hide();
              }
})
//-----------------------------------------------------------------------------------------------------------------------------------
//Control encargado de mostrar el listado de adds
.controller('PlaylistsCtrl', function($scope,$rootScope,$location,$ionicLoading) {
              $.ajax({
                  url: "http://smartshopping.herokuapp.com/api/articles",
              }).then(function(data) {
                  $rootScope.playlists= data;
              });   

              $scope.searcharticle=function() { 
                  $.ajax({
                      url: "http://smartshopping.herokuapp.com/searchArticle?search="+$scope.searchtitle,
                  }).then(function(data) {
                     $rootScope.playlists= data;
                  });   
                  $scope.show();
              }

              $scope.show = function() {
                  $ionicLoading.show({  template: 'Loading...', duration: 5000});
              };

              $scope.hide = function(){
                  $ionicLoading.hide();
              };
})

//-----------------------------------------------------------------------------------------------------------------------------------
//Control encargado de mostrar las add recomendadas
.controller('RecommendedAdsCtrl', function($scope,$rootScope,$location,$ionicLoading) {
              $.ajax({
                url: "http://smartshopping.herokuapp.com/specialSearch",
              }).then(function(data) {
                $rootScope.playlists= data;
              });   

              $scope.searcharticle=function() { 
                  $.ajax({
                      url: "http://smartshopping.herokuapp.com/searchArticle?search="+$scope.searchtitle,
                  }).then(function(data) {
                      $rootScope.playlists= data;
                  });   
                  $scope.show();
              }

              $scope.show = function() {
                  $ionicLoading.show({ template: 'Loading...', duration: 5000});
              };

              $scope.hide = function(){
                  $ionicLoading.hide();
              };
})
//-----------------------------------------------------------------------------------------------------------------------------------
//
.controller('PlaylistsCtrl2', function($scope,$rootScope,$location,$ionicLoading) {
              $scope.searcharticle=function() { 
                  $.ajax({
                      url: "http://smartshopping.herokuapp.com/searchArticle?search="+$scope.searchtitle,
                  }).then(function(data) {
                     $rootScope.playlists= data;
                  });   
                  $scope.show();
              }

              $scope.show = function() {
                  $ionicLoading.show({  template: 'Loading...', duration: 5000});
              };

              $scope.hide = function(){
                  $ionicLoading.hide();
              };
})
//-----------------------------------------------------------------------------------------------------------------------------------
//Control encargado de la visualizacion detallada de un add
.controller('PlaylistCtrl', function($scope, $stateParams,$rootScope,$ionicLoading,$location) {
              $.ajax({
                  url: "http://smartshopping.herokuapp.com/api/articles/"+$stateParams.playlistId,
              }).then(function(data) {
                 $scope.objetoActual = data;
                 $scope.show(); 
              });

              $.ajax({
                  url: "http://smartshopping.herokuapp.com/searchtagsarticle?idarticle="+$stateParams.playlistId,
              }).then(function(data) {
                 $scope.tags = data;
              });

              $scope.rate = function(){
                  $.ajax({
                    url: "http://smartshopping.herokuapp.com/score?id="+$stateParams.playlistId+"&points=1",
                  }).then(function(data) {
                     $scope.objetoActual = data;
                  });
                  $scope.show();
              }

              $scope.searchothers = function(tag){
                  $.ajax({
                      url: "http://smartshopping.herokuapp.com/searchTags?tag="+tag,
                  }).then(function(data) {
                     $rootScope.playlists = data;
                  });
                  $scope.show();
                  $location.url("/app/playlists2");
              }

              $scope.show = function() {
                  $ionicLoading.show({ template: 'Loading...', duration: 1000});
              };

              $scope.hide = function(){
                  $ionicLoading.hide();
              };
})
//-----------------------------------------------------------------------------------------------------------------------------------
//Control encargado de mostrar las add del usuario actual
.controller('MyAdsCtrl', function($scope,$rootScope,$ionicLoading) {
              $.ajax({
                  url: "http://smartshopping.herokuapp.com/getMyAdds?email="+$rootScope.email,
              }).then(function(data) {
                  $scope.show(); 
                  $scope.adds = data;
              });

              $scope.show = function() {
                  $ionicLoading.show({  template: 'Loading...', duration: 9000});
              };

              $scope.hide = function(){
                  $ionicLoading.hide();
              };
})
//-----------------------------------------------------------------------------------------------------------------------------------
//Control encargado de realizar la búsqueda por precios
.controller('SearchCtrl', function($scope,$rootScope,$location,$stateParams,$ionicLoading) {
              $scope.search = {};
              $rootScope.playlists=[];
              
              $scope.search = function() {
                $.ajax({
                    url: "http://smartshopping.herokuapp.com/getarticlesrange?idarticle1="+$scope.search.num1+"&idarticle2="+$scope.search.num2, //$rootScope.elementsearching,
                }).then(function(data) {
                    $rootScope.playlists= data;
                });
                $scope.show();
              };

              $scope.show = function() {
                  $ionicLoading.show({  template: 'Loading...', duration: 5000});
              };

              $scope.hide = function(){
                  $ionicLoading.hide();
              };
})
