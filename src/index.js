// Cache needed DOM elements
var $window = $(window);
var $animated = $('.animated');
var $toTop = $('.to-top');

// Trigger scroll event as soon as page loads
$window.trigger('scroll');

// Scroll animations
$window.on('scroll resize', function() {
	// Get bounds of current view
	var windowTop = $window.scrollTop();
	var windowBottom = windowTop + $window.height();

	// Back to top button
	if(windowTop > 0) {
		$toTop.addClass('affix');
	} else {
		$toTop.removeClass('affix');
	}

	// Check if each animated element is in view
	for(var i = 0; i < $animated.length; i++) {
		var $anim = $($animated[i]);
		var animTop = $anim.offset().top;
		var animBottom = animTop + $anim.outerHeight();

		// Add or remove animate class
		if(animBottom >= windowTop && animTop <= windowBottom) {
			$anim.addClass('animate');
		} else {
			//$anim.removeClass('animate');
		}
	}
});

// Update hash when scrolling
$window.on('activate.bs.scrollspy', function(e) {
	history.replaceState({}, "", $("a[href^='#']", e.target).attr("href"));
});
