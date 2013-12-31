'use strict';

angular.module('ui.bootstrap.scrollspy', [])
	.directive('scrollSpy', ['$window', '$timeout', '$rootScope', function($window, $timeout, $rootScope) {
	  var targets,
	      spies = [];

	  var refresh = function(attrs) {
	    var slice = Array.prototype.slice;

	    targets = $(attrs.target).children();
	    $timeout(function() {
	      slice.call(targets).forEach(function(el) {
	        spies.push($(el.querySelector('a:first-child').getAttribute('href')));
	      });
	    }, 0);
	  };

	  var activate = function(scope, $element, attrs) {
	    $(attrs.target + ' > .active').removeClass('active');
	    $element.addClass('active');
	  };

	  var process = function(scope, element, attrs) {
	    var windowHeight = $window.innerHeight,
	        windowTop = $window.scrollY,
	        $activeTarget;

	    spies.map(function(item, index) {
	      var pos = item.offset().top - windowTop;

	      if (pos < windowHeight) {
	        $activeTarget = targets.eq(index);
	      }
	    });

	    activate(scope, $activeTarget, attrs);
	  };

	  return {
	    link: function(scope, element, attrs) {
	      targets = [];
	      spies = [];

	      refresh(attrs);

	      angular.element($window).bind("scroll", function() {
	        process(scope, element, attrs);
	        
	        scope.$apply();
	      });

	      // When DOM changes, refresh with a broadcast like this $rootScope.$broadcast('scrollspy.refresh');
	      $rootScope.$on('scrollspy.refresh', function() {
	        refresh(attrs);
	        // console.log('scrollspy.refresh');
	      });

	    }
	  }
	}]);
