angular.module('myApp', ['ui.router'])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
    .state('/', {
      url: '/',
      controller: 'mainCtrl'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'mainCtrl'
    });
    $urlRouterProvider.otherwise("/");
  })
  .directive('newApt',function() {
    return {
      restrict: 'E',
      templateUrl: '../templates/newApt.html',
      link: function(scope,element,attr) {

      }
    };
  })
  .directive('addModule', function() {
    return {
      restrict: "E",
      templateUrl: "../templates/addModule.html",
      link: function(scope,element,attr) {
        $('.close').on('click',function() {
          $('.aptForm').css('display','none');
        });

        $('.submitApt').on('click',function() {
          if($('.submitPerRoom').val()&&$('.submitComplex').val()){
            $('.aptForm').css('display','none');
          }
        });
      }
    };
  })
  .directive('loginModule',function() {
    return {
      restrict: 'E',
      templateUrl: '../templates/loginModule.html',
      link: function(scope,element,attr) {
        $('.submitUser').on('click', function() {
          if(scope.user){
            $('.loginForm').css('display','none');
            $('.aptForm').css('display','flex');
          }
        });
      }
    };
  })
  .directive('specificApt',function() {
    return {
      restrict: "E",
      templateUrl: '../templates/specificApt.html'
    };
  });
