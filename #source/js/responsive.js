//Adaptive functions
$(window).resize(function (event) {
	adaptive_function();
});
function adaptive_header(w, h) {
	var headerMenu = $('.header-menu');
	var headerRightMenu = $('.header-right-menu');
	if (w < 650) {
		if (!headerRightMenu.hasClass('done')) {
			headerRightMenu.addClass('done').appendTo(headerMenu);
		}
	} else {
		if (headerRightMenu.hasClass('done')) {
			headerRightMenu.removeClass('done').prependTo($('.header-right'));
		}
	}
}
function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w, h);
}
adaptive_function();