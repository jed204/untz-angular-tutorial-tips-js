var module = angular.module('untz.tutorialtips', []);

module.service("untzTutorialTipsSvc", function() {
    var callback;
    return {
        subscribe: function(cb) {
            callback = cb;
        },
        setTips: function(msg) {
            callback(msg);
        }
    };
});

module.directive('untzTutorialTips', ['untzTutorialTipsSvc', function(untzTutorialTipsSvc){
    return {
        scope: {
        },
        template: '<div ng-show="showMask" id="untz-tooltip-mask" class="untz-tooltip-mask"></div>' +
				   '<div ng-show="show" id="untz-tooltip-primary" class="untz-tooltip">' +
					'  <div class="diamond" id="tooltip-diamond"></div>' +
					'    <a class="close-tooltip" ng-click="close()">✕</a>' +
					'    <h4>{{step.header}}</h4>' +
					'    <p>{{step.text}}</p>' +
					'    <div class="navigation">' +
					'	   <div ng-hide="hideNav">' +
					'      <span class="step">{{stepIdx}} of {{untzTooltips.length}}</span>' +
					'      <button class="btn btn-tooltip">' +
					'      	<span ng-show="stepIdx < untzTooltips.length" ng-click="nextStep()">Next</span>' +
					'      	<span ng-show="stepIdx == untzTooltips.length" ng-click="close()">Close</span>' +
					'      </button>' +
					'      </div>' +
					'    </div>' +
					'  </div>' +
				   '</div>',
        link: function($scope, element, attrs, controller) {
        	

			untzTutorialTipsSvc.subscribe(function(tips) {
        		if (!tips)
        			return;

				if (tips.length > 0) {
					$scope.untzTooltips = tips;
					$scope.fadein();        		
				}
				else
				{
					$scope.close();
				}
			});

        	var mask = document.getElementById('untz-tooltip-mask');
        	var tooltip = document.getElementById('untz-tooltip-primary');

        	$scope.fadein = function() {

        		if (!$scope.untzTooltips || $scope.untzTooltips.length == 0)
        			return;

        		$scope.stepIdx = 1;
	        	$scope.show = true;
	        	$scope.showMask = true;

	        	mask.className += mask.className ? ' untz-tooltip-solid' : 'untz-tooltip-solid';
	        	tooltip.className += mask.className ? ' untz-tooltip-solid' : 'untz-tooltip-solid';
	        	$scope.loadStep();
	        }

        	$scope.loadStep = function() {
	        	$scope.step = $scope.untzTooltips[$scope.stepIdx - 1];

	        	var ele = document.getElementById('untz-tooltip-primary');
	        	ele.style.top = $scope.step.top + 'px';
	        	if ($scope.step.right)
	        	{
		        	ele.style.right = $scope.step.right + 'px';
		        	ele.style.left = '';
	        	}
	        	else if ($scope.step.rightOf) {
	        		var target = $('#' + $scope.step.rightOf);
	        		if (target && target.offset()) {
	        			var topOff = 0;
	        			if ($scope.step.top)
	        				topOff = $scope.step.top;
		        		ele.style.left = (target.offset().left + target.width() + 30) + 'px';
			        	ele.style.right = '';
			        	ele.style.top = (target.offset().top - 34 + topOff) + 'px';
			        }
	        	}
	        	else if ($scope.step.leftOf) {
	        		var target = $('#' + $scope.step.leftOf);
	        		if (target && target.offset()) {
	        			var topOff = 0;
	        			if ($scope.step.top)
	        				topOff = $scope.step.top;
	        			
		        		ele.style.right = ($( window ).width() - target.offset().left + 30) + 'px';
			        	ele.style.left = '';
			        	ele.style.top = (target.offset().top - 34 + topOff) + 'px';
			        }
	        	}
	        	else
	        	{
		        	ele.style.left = $scope.step.left + 'px';
		        	ele.style.right = '';
		        }

	        	$scope.showMask = !$scope.step.hideMask;
		        $scope.hideNav = $scope.step.hideNav;

	        	var ele = document.getElementById('tooltip-diamond');
	        	var bottom = 45;
	        	if ($scope.step.diamondBottom)	
	        		bottom = $scope.step.diamondBottom;

		        ele.style.bottom = bottom + 'px';


	        	if ($scope.step.side == 'right') {
			        ele.className = 'diamond untz-right'
		        	ele.style.right = '-7px';
		        	ele.style.left = '';
	        	}
		        else {
			        ele.className = 'diamond untz-left'
		        	ele.style.left = '-6px' 
		        	ele.style.right = '';
		        }
	        }

	        $scope.nextStep = function() {
	        	$scope.stepIdx++;
	        	$scope.loadStep();
	        }

	        $scope.close = function() {
	        	$scope.showMask = false;
	        	mask.className = 'untz-tooltip-mask ng-hide';
	        	tooltip.className = 'untz-tooltip';
	        }

	        $scope.fadein();
        }
    }
}]);

