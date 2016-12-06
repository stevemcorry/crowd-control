angular.module('myApp', ['ui.router'])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
    .state('/', {
      url: '/'
    })
    .state('ratings', {
      url: '/ratings',
      templateUrl: 'views/ratings.html',
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
          if($('.submitRent').val()&&$('.submitComplex').val()){
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
          }
        });
        $('.close').on('click',function() {
          $('.loginForm').css('display','none');
          $('.aptForm').css('display','none');
        });
      }
    };
  })
  .directive('specificApt',function() {
    return {
      restrict: "E",
      templateUrl: '../templates/specificApt.html',
      link: function(scope,element,attr) {

        // $('.boxApt').on('mouseover', function() {
        //   $('.aptDetails').css('display','block');
        // });
        // $('.boxApt').on('mouseleave', function() {
        //   $('.aptDetails').css('display','none');
        // });

      }
    };
  });
