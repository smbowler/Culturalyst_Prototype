'use strict';

/**
 * @ngdoc function
 * @name culturalystApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the culturalystApp
 */
angular.module('culturalystApp')
    .controller('ArtistCtrl', ["$scope", "$location", "$anchorScroll", function($scope, $location, $anchorScroll) {

        $scope.pathArray = $location.path().split('/')
        $scope.artistId = $scope.pathArray.pop();
        $scope.medium = $scope.pathArray[$scope.pathArray.length - 1];
        $scope.selectedArtist;

        //to load Artist Profile at the top of the page. 
        $scope.toTop = function() {
            $location.hash('top');
            $anchorScroll();
            $location.hash('');
        };

        $scope.runSwipe = function() {
            console.log('%%%%%%')
            var openPhotoSwipe = function() {
                var pswpElement = document.querySelectorAll('.pswp')[0];
                console.log(pswpElement);
                // build items array
                var items = [{
                    src: $scope.selectedArtist.profImg,
                    w: 500,
                    h: 500
                }, {
                    src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
                    w: 500,
                    h: 500
                }, {
                    src: 'https://pbs.twimg.com/profile_images/733797712550756353/Pb_Xxdp2.jpg',
                    w: 500,
                    h: 500
                }];

                // define options (if needed)
                var options = {
                    // history & focus options are disabled on CodePen        
                    history: false,
                    focus: false,

                    showAnimationDuration: 0,
                    hideAnimationDuration: 0

                };

                var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            };

            openPhotoSwipe();
        }

        //Getting Artist Profile Data
        firebase.database().ref('Artists/' + $scope.medium + '/' + $scope.artistId).once('value').then(function(snapshot) {
            $scope.selectedArtist = snapshot.val();
            console.log($scope.selectedArtist);
            $scope.$apply();
        });

        //Call function to take user to top of Artist Profile
        $scope.toTop();

    }]);
