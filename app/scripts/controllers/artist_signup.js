'use strict';

/**
 * Controller for Artist Signup
 */
angular.module('culturalystApp')
  .controller('ArtistSignupCtrl',['$scope', 'auth1', 'Upload', function ($scope, auth1, Upload) {

  	$scope.currentUser = {};
    $scope.selectedMedium;
    $scope.selectedSubmedium = [];
    $scope.artistType;

  $scope.getCurrentUser = function(){
    auth1.getCurrentUser();
    console.log('current user', auth1.getCurrentUser());
  };
  console.log('fireeeee: ', firebase);
  $scope.getCurrentUser();

    $scope.saveArtist = function(){
      var medium = $scope.selectedMedium.name
      var subMedium = $scope.selectedSubmedium
      var user = $scope.currentUser
      console.log(medium)
      firebase.database().ref('Artists/' + medium).push({
        name: user.name,
        name_last: user.name_last,
        birthday: user.dob,
        selectedMedium: medium,
        selectedSubmedium:subMedium,
        hometown: user.hometown,
        hometownState: user.hometown_state,
        sampleWork: user.sampleWork,
        story: user.biography
      });
    };


    $scope.loadSubMediums = function(medium){
      console.log(medium);
      $scope.submedia = medium.submedia;
    };

    $scope.selectionMade = function(){
      console.log('in this bish')
      if ($scope.results != undefined){
        return true
      } else{
        return false
      }
    };

    $scope.storage = firebase.storage();

    $scope.storageRef = $scope.storage.ref();

    $scope.setMusicRef = function(sampleWork){
      $scope.musicRef = $scope.storageRef.child('music' + '-' + $scope.currentUser.uid + '-' + sampleWork);
      console.log(sampleWork);
    }


// upload song
    var fileInput = document.getElementById('fileInput');
      fileInput.addEventListener('change', function(e) {
          $scope.musicRef.put(fileInput.files[0]).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
      });
    });


    $scope.saveSampleWork = function(){
        $scope.musicRef.getDownloadURL().then(function(url) {
        console.log(url);
        $scope.currentUser.sampleWork = url;
      }).catch(function(error) {
        // Handle any errors
        });
    };

    $scope.play = function(){
      $scope.mySound.play();
    }

    $scope.pressPlay = function(){
      $scope.musicRef.getDownloadURL().then(function(url) {
        $scope.mySound = soundManager.createSound({
          url: url
        })
        $scope.mySound.play();
      });
    }


    $scope.mediums = [
      {'name': 'Music', 'submedia': ['Acoustic', 'Afro-caribbean', 'Americana', 'Bounce', 'Brass', 'Blues', 'Bluegrass', 'Brazilian','Burlesque','Cajun','Celtic','Classical','Country','EDM','Folk','Funk','Gospel','Hip-Hop/R&B','Indie','Jazz','Punk','Reggae','Roots','Soul','Zydeco']},
      {'name': 'Visual', 'submedia': ['Photography', 'Painting', 'Sculpture','Graffiti', 'Film', 'Costumes', 'Graphic Design', 'Crafts']},
      {'name': 'Fashion', 'submedia': ['Clothing', 'Accessories', 'Eyewear','Jewelry']},
      {'name': 'Performing', 'submedia': ['Spoken Word', 'Comedy', 'Theater', 'Dance']},
      {'name': 'Written', 'submedia': ['Fiction', 'Non-fiction', 'Poetry', 'Journalism']},
      {'name': 'Culture Bearers', 'submedia': ['Digital', 'Film']},
      {'name': 'Culinary', 'submedia': []},
      {'name': 'Other', 'submedia': []}
    ];

    $scope.types = [
      {'name' : "I'm a professional man"},
      {'name' :"It's my hobby"},
    ];


    //image upload
    $scope.setImageRef = function() {
      $scope.imageRef = $scope.storageRef.child('images' + '-' + $scope.currentUser.uid);
    }

    //set image preview
    var imgFileInput = document.getElementById('imgFileInput');
    var imgPreview = document.getElementById('profPhoto');
    imgFileInput.addEventListener('change', function(e) {
      if(imgFileInput.files && imgFileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          imgPreview.src = e.target.result;
        }
        reader.readAsDataURL(imgFileInput.files[0]);
      }
      $scope.photoToUpload = imgFileInput.files[0];
    });

    $scope.saveProfPhoto = function() {
      $scope.imageRef.put($scope.photoToUpload).then(function(snapshot) {
        console.log('Uploaded a profile photo!');
        $scope.getOptimizedImgByURL(snapshot.downloadURL);
      });
    }

    //found this site: https://imageoptim.com/api/get?username=ktqzvxbthh
    //which works for image optimization. Just have to add the url in front of the original URL.
    //it is free for now and in beta. NO account to log into, but should be fine for just starting off.
    //Once we integrate a backend, we can use Kraken.io
    $scope.imageOptimURL = 'https://img.gs/ktqzvxbthh/full/'

    $scope.getOptimizedImgByURL = function(imgURL) {
      return $scope.imageOptimURL + imgURL;
    }

    $scope.setImageRef();

  }]);
