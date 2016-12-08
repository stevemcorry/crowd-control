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

  $scope.loginShow = function() {
    document.querySelector('.loginForm').style.display = 'flex';
  };

  $scope.loginCheck = function() {
    if($scope.loggedIn){
      document.querySelector('.aptForm').style.display = 'flex';
    } else {
      document.querySelector('.aptForm').style.display = 'flex';
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
            alert('incorrect information');
          } else {
            $scope.user = result.data;
            $scope.loggedIn = result.data.id;
            $scope.setCookie('id', result.data.id);
            $scope.setCookie('name', result.data.name);
            document.querySelector('.loginForm').style.display = 'none';
          }
        });
    } else {
      alert('Please fill out all info');
    }
  };

  $scope.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  $scope.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return (c.substring(name.length,c.length));
        }
    }
    return "";
  };

  $scope.setUserId = function() {
    $scope.loggedIn = $scope.getCookie('id');
  };
  $scope.setUser = function(){
    $scope.loggedInName = $scope.getCookie('name');
  };
  $scope.setUserId();
  $scope.setUser();

  $scope.addApt = function(complexName,perRoom,singleRoom,gender,rent){
    if($scope.user){
      if(complexName&&(perRoom&&gender || singleRoom)&&rent){
        if(singleRoom){
          gender = null;
          perRoom = null;
        }
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
      } else {
        alert('Please fill out all information');
      }
    } else {
      $scope.getApartments();
    }
  };

  $scope.deleteApt = function(id) {
    var aptId = $scope.apartments.filter(function(value) {
      return(value.id === id);
    });
    if($scope.loggedIn == aptId[0].user_id){
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

  $scope.sendEmail = function(fromEmail,toEmail,subject,content) {
    $http({
      method: "POST",
      url: "http://localhost:3000/email",
      body: {
        from: fromEmail,
        to: toEmail,
        subj: subject,
        cont: content
      }
    });
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

  $scope.marriedFilter = function() {
    console.log($scope.aptFilter);
    $scope.aptFilter.gender = undefined;
  };

  $scope.orderMe = function(x) {
    if(x === 'no'){
      console.log('ok');
    }
    $scope.order = x;
    console.log($scope.rentOrder);
  };

  $scope.order = '-id';
});
