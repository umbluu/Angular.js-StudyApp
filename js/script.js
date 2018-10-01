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

scotchApp.controller('snakeCtrl', function($scope, $timeout, $window) {
  var BOARD_SIZE = 16;

  var DIRECTIONS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

  var COLORS = {
    GAME_OVER: '#EA2027',
    FRUIT: '#D980FA',
    SNAKE_HEAD: '#2ed573',
    SNAKE_BODY: '#7bed9f',
    BOARD: '#dfe4ea'
  };

  var snake = {
    direction: DIRECTIONS.LEFT,
    parts: [{
      x: -1,
      y: -1
    }]
  };

  var fruit = {
    x: -1,
    y: -1
  };

  var interval, tempDirection, isGameOver;

  $scope.score = 0;

  $scope.setStyling = function(col, row) {
    if (isGameOver)  {
      return COLORS.GAME_OVER;
    } else if (fruit.x == row && fruit.y == col) {
      return COLORS.FRUIT;
    } else if (snake.parts[0].x == row && snake.parts[0].y == col) {
      return COLORS.SNAKE_HEAD;
    } else if ($scope.board[col][row] === true) {
      return COLORS.SNAKE_BODY;
    }
    return COLORS.BOARD;
  };

  function update() {
    var newHead = getNewHead();

    if (boardCollision(newHead) || selfCollision(newHead)) {
      return gameOver();
    } else if (fruitCollision(newHead)) {
      eatFruit();
    }

    // Remove tail
    var oldTail = snake.parts.pop();
    $scope.board[oldTail.y][oldTail.x] = false;

    // Pop tail to head
    snake.parts.unshift(newHead);
    $scope.board[newHead.y][newHead.x] = true;

    // Do it again
    snake.direction = tempDirection;
    $timeout(update, interval);
  }

  function getNewHead() {
    var newHead = angular.copy(snake.parts[0]);

    // Update Location
    if (tempDirection === DIRECTIONS.LEFT) {
        newHead.x -= 1;
    } else if (tempDirection === DIRECTIONS.RIGHT) {
        newHead.x += 1;
    } else if (tempDirection === DIRECTIONS.UP) {
        newHead.y -= 1;
    } else if (tempDirection === DIRECTIONS.DOWN) {
        newHead.y += 1;
    }
    return newHead;
  }

  function boardCollision(part) {
    return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
  }

  function selfCollision(part) {
    return $scope.board[part.y][part.x] === true;
  }

  function fruitCollision(part) {
    return part.x === fruit.x && part.y === fruit.y;
  }

  function resetFruit() {
    var x = Math.floor(Math.random() * BOARD_SIZE);
    var y = Math.floor(Math.random() * BOARD_SIZE);

    if ($scope.board[y][x] === true) {
      return resetFruit();
    }
    fruit = {x: x, y: y};
  }

  function eatFruit() {
    $scope.score++;
    
    // Grow by 1
    var tail = angular.copy(snake.parts[snake.parts.length-1]);
    snake.parts.push(tail);
    resetFruit();

    if ($scope.score % 5 === 0) {
      interval -= 15;
    }
  }

  function gameOver() {
    isGameOver = true;

    $timeout(function() {
      isGameOver = false;
    },500);

    setupBoard();
  }

  function setupBoard() {
    $scope.board = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
      $scope.board[i] = [];
      for (var j = 0; j < BOARD_SIZE; j++) {
        $scope.board[i][j] = false;
      }
    }
  }
  setupBoard();

  $window.addEventListener("keyup", function(e) {
    if (e.keyCode == DIRECTIONS.LEFT && snake.direction !== DIRECTIONS.RIGHT) {
      tempDirection = DIRECTIONS.LEFT;
    } else if (e.keyCode == DIRECTIONS.UP && snake.direction !== DIRECTIONS.DOWN) {
      tempDirection = DIRECTIONS.UP;
    } else if (e.keyCode == DIRECTIONS.RIGHT && snake.direction !== DIRECTIONS.LEFT) {
      tempDirection = DIRECTIONS.RIGHT;
    } else if (e.keyCode == DIRECTIONS.DOWN && snake.direction !== DIRECTIONS.UP) {
      tempDirection = DIRECTIONS.DOWN;
    }
  });

  $scope.startGame = function() {
    $scope.score = 0;
    snake = {direction: DIRECTIONS.LEFT, parts: []};
    tempDirection = DIRECTIONS.LEFT;
    isGameOver = false;
    interval = 150;

    // Set up initial snake
    for (var i = 0; i < 5; i++) {
      snake.parts.push({x: 10 + i, y: 10});
    }
    resetFruit();
    update();
  };

});