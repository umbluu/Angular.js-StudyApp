// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'pages/home.html',
      controller  : 'mainController'
    })

    // route for the todo page
    .when('/todo', {
      templateUrl : 'pages/todo.html',
      controller  : 'todoController'
    })
    
    // route for the example page
    .when('/example', {
      templateUrl : 'pages/example.html',
      controller  : 'exampleController'
    })
    
    // route for the resources page
    .when('/resources', {
      templateUrl : 'pages/resources.html',
      controller  : 'resourcesController'
    })
    
    // route for the game page
    .when('/game', {
      templateUrl : 'pages/game.html',
      controller  : 'gameController'
    })

    // route for the example page
    .when('/feedback', {
      templateUrl : 'pages/feedback.html',
      controller  : 'feedbackController'
    });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope) {
  // create a message to display in our view
  $scope.message = 'Everyone come and see how good I look!';
});

scotchApp.controller('todoController', function($scope) {
  $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('exampleController', function($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('resourcesController', function($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('gameController', function($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('feedbackController', function($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});