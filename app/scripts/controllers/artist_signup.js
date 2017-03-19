'use strict';

/**
 * Controller for Artist Signup
 */
angular.module('culturalystApp')
  .controller('ArtistSignupCtrl',['$scope', 'auth1', 'Upload', function ($scope, auth1, Upload) {

  	$scope.currentUser = $scope.currentUser || {};
    $scope.selectedMedium;
    $scope.selectedSubmedium = [];
    $scope.artistType;

/*
GET CURRENT USER
TODO: 
1. Link a Users Profile to an Artist Profile
2. setCurrentUser as $scope.currentUser so that fields are autopopulated with answers.
*/
  $scope.getCurrentUser = function(){
    $scope.currentUser = auth1.getCurrentUser();
    console.log('current user', auth1.getCurrentUser());
  };

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
        story: user.biography,
        profImg: user.optimizedImg
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

//firebase storage initiated
    $scope.storage = firebase.storage();

    $scope.storageRef = $scope.storage.ref();


/*
ARTIST UPLOADING SONG
*/
//setting Music Reference to save to Firebase
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

//save song
    $scope.saveSampleWork = function(){
        $scope.musicRef.getDownloadURL().then(function(url) {
        console.log(url);
        $scope.currentUser.sampleWork = url;
      }).catch(function(error) {
        // Handle any errors
        });
    };
/*
PLAY A SONG
Temporary Logic here. This will be moved to Discovery, where a user can preview a song uploaded by a user
*/
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
/*
UPLOAD A PICTURE TO ARTIST PROFILE
TODO: PROVIDE A PROGRESS BAR SO THAT WE CAN SHOW USER WHEN UPLOAD IS COMPLETE
*/

    //set Image Reference on Firebase
    $scope.setImageRef = function(name) {
      $scope.imageRef = $scope.storageRef.child('images' + '-' + name + '-' + $scope.currentUser.uid);
      console.log($scope.imageRef);
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

    //save Profile Photo to Firebase
    $scope.saveProfPhoto = function() {
      console.log('attempting to save photo');
      $scope.imageRef.put($scope.photoToUpload).then(function(snapshot) {
        console.log('Uploaded a profile photo!');
        $scope.getOptimizedImgByURL(snapshot.downloadURL);
      });
    }

/*
Optimize Photo!
*/
    //found this site: https://imageoptim.com/api/get?username=ktqzvxbthh
    //which works for image optimization. Just have to add the url in front of the original URL.
    //it is free for now and in beta. NO account to log into, but should be fine for just starting off.
    //Once we integrate a backend, we can use Kraken.io
    $scope.imageOptimURL = 'https://img.gs/ktqzvxbthh/full/'

    $scope.getOptimizedImgByURL = function(imgURL) {
      $scope.currentUser.optimizedImg = $scope.imageOptimURL + imgURL;
      console.log($scope.optimizedImg);
      return $scope.optimizedImg;
    }
/*
MEDIUMS and SUBMEDIUMS - Load in Dropdowns
*/
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

  }]);
