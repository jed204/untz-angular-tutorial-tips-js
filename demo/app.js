'use strict';

var app = angular.module('myApp', [
	'untz.tutorialtips'
]);

app.controller('MainCtrl', ['$scope', 'untzTutorialTipsSvc',
	 			   function($scope, untzTutorialTipsSvc)

{
	$scope.startTutorial = function() {
		untzTutorialTipsSvc.setTips([ 
			{ header: 'Welcome', text : 'Welcome to the first tip!', left: 450, top: 43 }, 
			{ header: 'Clicked out?', text : 'You can restart this tutorial by clicking here.', left: 252, top: 134 },
			{ header: 'Nice Header!', text : 'You can also point to the right side, if you want.', right: 443, top: 285, side: 'right' } 
		]);
	}

	$scope.startTutorial();
}]);


