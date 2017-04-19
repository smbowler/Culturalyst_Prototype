'use strict';

/**
 * @ngdoc function
 * @name culturalystApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the culturalystApp
 */
angular.module('culturalystApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  $scope.runSwipe = function(){
  								console.log('%%%%%%')
							    var openPhotoSwipe = function() {
							    var pswpElement = document.querySelectorAll('.pswp')[0];
							    console.log(pswpElement);
							    // build items array
							    var items = [
							        {
							            src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
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


  });
