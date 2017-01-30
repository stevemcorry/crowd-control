angular.module('myApp', ['ui.router'])
  .config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
    .state('home', {
      url: '/home'
    })
    .state('/',{
      url: '/',
      templateUrl: 'views/home.html'
    })
    .state('ratings', {
      url: '/ratings',
      templateUrl: 'views/ratings.html',
    });
    $urlRouterProvider.otherwise("/");
  })
  .filter('myFilter', function() {
    return function(input, rentFilter) {
      if (rentFilter === undefined || rentFilter === "") {
        rentFilter = 3000000000000;
      }
      var out = [];
      angular.forEach(input, function(apt) {
        if (apt.rent <= rentFilter) {
          out.push(apt);
        }
      });
      return out;
    };
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
  .directive('leftBar',function() {
    return {
      restrict: 'E',
      templateUrl: '../templates/leftBar.html'

    };
  })
  .directive('filtersMenu', function() {
    return {
      restrict: 'E',
      templateUrl: '../templates/filtersMenu.html'
    };
  })
  .directive('specificApt',function() {
    return {
      restrict: "E",
      templateUrl: '../templates/specificApt.html',
      link: function(scope,element,attr) {
      }
    };
  })
  .directive('emailModule',function() {
    return {
      restrict: "E",
      templateUrl: '../templates/emailModule.html',
      link: function() {
        $('.close').on('click',function() {
          $('.emailForm').css('display', 'none');
        });
      }
    };
  });
