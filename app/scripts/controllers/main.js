'use strict';

/**
 * @ngdoc function
 * @name culturalystApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the culturalystApp
 */
angular.module('culturalystApp')
    .controller('MainCtrl', ['$scope', 'auth1', '$location', '$anchorScroll', function($scope, auth1, $location, $anchorScroll) {


        $scope.selectedMedium;
        $scope.selectedSubmedium = {};
        $scope.results;

        //Loads a selected Mediums subgenres
        $scope.loadSubMediums = function(medium) {
            console.log(medium);
            $scope.selectedSubmedium = [];
            $scope.submedia = medium.submedia;
        };

        //Used for ng-show, showing tabs after a user makes a query. 
        $scope.selectionMade = function() {
            if ($scope.results != undefined) {
                return true
            } else {
                return false
            }
        };


        //Spinner while query results are loading
        $scope.spin = true;

        $scope.runSpinner = function() {
            setTimeout(function() {
                $scope.spin = false;
                console.log('spinner');
            }, 2000)
        }

        $scope.goToArtist = function() {
            console.log('Going to Artist');
        }


        //Makes call to get artists from Firebase Database 
        $scope.getArtists = function(medium) {
            $scope.spin = true;
            //resetting results array
            $scope.firstArray = [];
            $scope.results = [];
            var Medium = medium.name;
            firebase.database().ref('/Artists/' + Medium).once('value').then(function(snapshot) {
                console.log(snapshot.val());
                var obj = snapshot.val();
                for (var key in obj) {
                    var innerObj = obj[key]
                    innerObj.uid = key;
                    console.log(innerObj);
                    $scope.firstArray.push(innerObj);
                }
                $scope.results = $scope.firstArray;
                $scope.runSpinner();
                $scope.$apply();
            })
        }

        $scope.changeLocation = function(medium) {
            $location.search({ key: medium.name });
        };


        $scope.test = function() {
            console.log($scope.selectedSubmedium);
            $scope.filter = $scope.selectedSubmedium;
        }

        $scope.runSwipe = function() {
            console.log('%%%%%%')
            var openPhotoSwipe = function() {
                var pswpElement = document.querySelectorAll('.pswp')[0];
                console.log(pswpElement);
                // build items array
                var items = [{
                    src: '../assets/images/cover_glustrom_fire.png',
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


        $scope.ifMusic = function(medium) {
            console.log('if music is firing');
            if (medium.name === 'Music') {
                return true;
            } else {
                return false;
            };
        }


        /* SOUNDPLAYER */
        $scope.myDate = new Date();

        $scope.mySound = soundManager.createSound({
            url: 'http://www.stephaniequinn.com/Music/Jazz%20Rag%20Ensemble%20-%2010.mp3'
        });

        $scope.play = function() {
            $scope.mySound.play();
        }

        $scope.mediums = [
            { 'name': 'Music', 'submedia': ['Acoustic', 'Afro-caribbean', 'Americana', 'Bounce', 'Brass', 'Blues', 'Bluegrass', 'Brazilian', 'Burlesque', 'Cajun', 'Celtic', 'Classical', 'Country', 'EDM', 'Folk', 'Funk', 'Gospel', 'Hip-Hop/R&B', 'Indie', 'Jazz', 'Punk', 'Reggae', 'Roots', 'Soul', 'Zydeco'] },
            { 'name': 'Visual', 'submedia': ['Photography', 'Painting', 'Sculpture', 'Graffiti', 'Film', 'Costumes', 'Graphic Design', 'Crafts'] },
            { 'name': 'Fashion', 'submedia': ['Clothing', 'Accessories', 'Eyewear', 'Jewelry'] },
            { 'name': 'Performing', 'submedia': ['Spoken Word', 'Comedy', 'Theater', 'Dance'] },
            { 'name': 'Written', 'submedia': ['Fiction', 'Non-fiction', 'Poetry', 'Journalism', 'Dallas'] },
            { 'name': 'Culture Bearers', 'submedia': ['Digital', 'Film'] },
            { 'name': 'Culinary', 'submedia': [] },
            { 'name': 'Other', 'submedia': [] }
        ];

    }]);
