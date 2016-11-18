angular.module('myApp').controller('mainCtrl', function($scope) {

  $scope.allApartments = [];
  //add apartment box
  $scope.addApt = function(name,complexName,perRoom){
    if(name&&complexName&&perRoom){
      $scope.allApartments.unshift({
        name: name,
        complex: complexName,
        perRoom: perRoom + " in the room"
      });
  //resets all input values
    $scope.name = '';
    $scope.complexName = '';
    $scope.perRoom = '';
    }
  };
});
