// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngAnimate']);

// configure our routes
scotchApp.config(function ($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'mainController'
    })

    // route for the todo page
    .when('/todo', {
      templateUrl: 'pages/todo.html',
      controller: 'todoController'
    })

    // route for the example page
    .when('/example', {
      templateUrl: 'pages/example.html',
      controller: 'exampleController'
    })

    // route for the resources page
    .when('/resources', {
      templateUrl: 'pages/resources.html',
      controller: 'resourcesController'
    })

    // route for the game page
    .when('/game', {
      templateUrl: 'pages/game.html',
      controller: 'gameController'
    })

    // route for the example page
    .when('/feedback', {
      templateUrl: 'pages/feedback.html',
      controller: 'feedbackController'
    });


});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function ($scope) {
  // create a message to display in our view
  $scope.message = 'Everyone come and see how good I look!';
});

scotchApp.controller('todoController', function ($scope) {
  $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('exampleController', function ($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('resourcesController', function ($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('gameController', function ($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('feedbackController', function ($scope) {
  $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('todoCtrl', function ($scope) {

  $scope.todos = [{
      text: 'learn angular',
      done: true
    },
    {
      text: 'build an angular app',
      done: false
    }
  ];

  $scope.addTodo = function () {
    $scope.todos.push({
      text: $scope.todoText,
      done: false
    });
    $scope.todoText = '';
  };

  $scope.remaining = function () {
    var count = 0;
    angular.forEach($scope.todos, function (todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function () {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function (todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
});

scotchApp.controller('tabsController', function($scope){
	$scope.tabs = [
	{
		name: 'Intro',
		url: 'tabs-data/angular.html',
		active1: true
	},{
		name: 'Modules',
		url: 'tabs-data/modules.html',
		active1: false
	},{
		name: 'Data Binding',
		url: 'tabs-data/data-binding.html',
		active1: false
	}
	];
	
	
	$scope.tab = 'tabs-data/angular.html'; /*default tab*/
	$scope.current = 'Angular'; /*default active tab*/
	
	$scope.toggleTab = function(s){
		$scope.tab = s.url;  /*tab changed*/
		$scope.current = s.name; /* changing value of current*/
	};
});