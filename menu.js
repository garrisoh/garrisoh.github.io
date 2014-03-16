$(document).ready(function() {
	// load menu bar html into page
	$('#menubar').load("menu.html", function(){
		// set the width of submenus to 19.5% window width
		// this makes them the same size as the main bar items,
		// since setting the width property in the CSS file to 19.5% doesn't seem to work
		$('#menu li.sub').width($(window).width() * 0.195);
		
		// resize with window
		$(window).resize(function() {
			$('#menu li.sub').width($(window).width() * 0.195);
			$('#menu').menu("collapseAll", null, true);
		});

		// create menu
		$('#menu').menu({position: {my: "left top", at: "left-3 bottom"}, icons: {submenu: "ui-icon-triangle-1-s"}});
	});

});
