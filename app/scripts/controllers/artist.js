'use strict';

/**
 * @ngdoc function
 * @name culturalystApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the culturalystApp
 */
angular.module('culturalystApp')
  .controller('ArtistCtrl',["$scope", "$location", "$anchorScroll", function ($scope, $location, $anchorScroll) {

  $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  
  $scope.toTop = function(){
   $anchorScroll();
  };


  $scope.runSwipe = function(){
                  console.log('%%%%%%')
                  var openPhotoSwipe = function() {
                  var pswpElement = document.querySelectorAll('.pswp')[0];
                  console.log(pswpElement);
                  // build items array
                  var items = [
                      {
                          src: $scope.selectedArtist.profImg,
                          w: 500,
                          h: 500
                      },
                      {
                          src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
                          w: 500,
                          h: 500
                      },
                       {
                          src: 'https://pbs.twimg.com/profile_images/733797712550756353/Pb_Xxdp2.jpg',
                          w: 500,
                          h: 500
                      }
                  ]; 
                  
                  // define options (if needed)
                  var options = {
                     // history & focus options are disabled on CodePen        
                      history: false,
                      focus: false,

                      showAnimationDuration: 0,
                      hideAnimationDuration: 0
                      
                  };
                  
                  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                  gallery.init();
              };

openPhotoSwipe();


console.log(openPhotoSwipe);
//document.getElementById('btn').onclick = openPhotoSwipe;  
  }

    

    $scope.pathArray = $location.path().split('/')
    $scope.artistId = $scope.pathArray.pop();
    $scope.medium = $scope.pathArray[$scope.pathArray.length - 1];
    console.log($scope.pathArray);
    console.log($scope.artistId);
    console.log($scope.medium);
    $scope.selectedArtist;


    	//  firebase.database().ref('Artists/' + $scope.medium + '/' + $scope.artistId).once('value').then(function(snapshot) {
				 //   $scope.selectedArtist = snapshot.val();
				 //   console.log(selectedArtist);
				 //   $scope.apply();
					// });

    	 	  firebase.database().ref('Artists/' + $scope.medium + '/' + $scope.artistId).once('value').then(function(snapshot) {
				   $scope.selectedArtist = snapshot.val();
				   console.log($scope.selectedArtist);
				    $scope.$apply();
					});


    	 
    	 // $scope.$apply();
       $scope.some = 'Artist Controller';


	  //$scope.getArtist();

  
    //  $scope.getArtist = function(){
    // 	 firebase.database().ref('Artists/Music/-KYf6QBaNyB_Y-DtMMaB').once('value').then(function(snapshot) {
				//   var data = snapshot.val()
				// 	console.log(data);
				// 			});
    // }
    
  }]);
