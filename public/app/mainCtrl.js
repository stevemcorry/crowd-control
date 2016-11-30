angular.module('myApp').controller('mainCtrl', function($scope,$http) {

  $scope.getApartments = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/apartments'
    }).then(function(result) {
      $scope.apartments = result.data;
    });
  };

  $scope.getApartments();

  $scope.getComplexes = function() {
    return $http({
      method: "GET",
      url: 'http://localhost:3000/complexes'
    }).then(function(result) {
      $scope.complexes = result.data;
    });
  };

  $scope.getComplexes();

  $scope.loginCheck = function() {
    if($scope.loggedIn){
      document.querySelector('.aptForm').style.display = 'flex';
    } else {
      document.querySelector('.loginForm').style.display = 'flex';
    }
  };

  $scope.login = function(email, password, loginName) {
    if(email && password && loginName){
      $http({
        method: 'POST',
        url: 'http://localhost:3000/user',
        data: {
          email: email,
          password: password,
          name: loginName
        }
      }).then(function(result) {
          if(result.data === 'nope'){
            alert('incorrect info');
          } else {
            $scope.user = result.data;
            $scope.loggedIn = result.data.id;
            document.querySelector('.aptForm').style.display = 'flex';
            document.querySelector('.loginForm').style.display = 'none';
          }
        });
    } else {
      alert('Please fill out all info');
    }
  };

  $scope.addApt = function(complexName,perRoom,singleRoom,gender,rent){
    if($scope.user){
      if(complexName&&perRoom&&gender&&rent){
        $http({
          method: 'POST',
          url: 'http://localhost:3000/apartment',
          data: {
            user_id: 13,
            complex: complexName,
            perRoom: perRoom,
            singleRoom: singleRoom,
            gender: gender,
            rent: rent
          }
        }).then(function() {
          $scope.getApartments();
        });
      }
    } $scope.getApartments();
  };

  $scope.deleteApt = function(id) {
    var aptId = $scope.apartments.filter(function(value) {
      return(value.id === id);
    });
    console.log(aptId[0].user_id);
    if($scope.loggedIn === aptId[0].user_id){
      $http({
        method: "POST",
        url: 'http://localhost:3000/apartment/delete',
        data: {
          id: id,
          user_id: aptId[0].user_id
        }
      });
      $scope.getApartments();
      $scope.specificApt = [];
    } else {
      alert('Please login to the correct account to delete this post');
    }
    $scope.getApartments();
  };

  $scope.detailedApt = function(id) {
    var aptId = $scope.apartments.filter(function(value) {
      return(value.id === id);
    });
    $scope.specificApt = aptId[0];
  };

  $scope.hoverStop = function() {
    $scope.stopHover = true;
  };

  $scope.detailApt = function(id) {
    if($scope.stopHover !== true){
      var aptId = $scope.apartments.filter(function(value) {
        return(value.id === id);
      });
      $scope.specificApt = aptId[0];
    }
  };
});
