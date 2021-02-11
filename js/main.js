
$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
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
jQuery.fn.jcOnPageFilter = function(settings) {
	settings = jQuery.extend({
		animateHideNShow:false,
		focusOnLoad:false,
		highlightColor:'',
		textColorForHighlights:'#000000',
		caseSensitive:false, //искать только в первом слове строки
		hideNegatives:true,
		addClassElems:false,
		addClassParent:false,
		addClassSection:false,
		parentSearchClass:'',
		parentSectionClass:'',
		parentLookupClass:'jcorgFilterTextParent',
		childBlockClass:'jcorgFilterTextChild',
	}, settings);
	jQuery.expr[':'].icontains = function(obj, index, meta) {                    
		return jQuery(obj).text().toUpperCase().indexOf(meta[3].toUpperCase()) >= 0;                
	}; 
	if(settings.focusOnLoad) {
	  jQuery(this).focus();
	}
	var rex = /(<span.+?>)(.+?)(<\/span>)/g;
	var rexAtt = "g";
	if(!settings.caseSensitive) {
	   rex = /(<span.+?>)(.+?)(<\/span>)/gi;
	   rexAtt = "gi";
	}
	return this.each(function() {
		jQuery(this).keyup(function(e) {
			if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
				return false;
			}
			else {
				
				function hideSection() {
					jQuery('.'+settings.parentLookupClass).closest('.'+settings.parentSectionClass).each(function() {
						var count = 0;
						var countElem = jQuery(this).closest('.'+settings.parentSectionClass).find('.'+settings.parentLookupClass).length;
						jQuery(this).find('.'+settings.parentLookupClass).each(function() {
							if (jQuery(this).css('display') == 'none') {
								++count;
							}
						});
						if (count == countElem) {
							if(settings.animateHideNShow) {
								jQuery(this).closest('.'+settings.parentSectionClass).fadeOut(100);
							}
							else {
								jQuery(this).closest('.'+settings.parentSectionClass).hide();
							}
						} else {
							if(settings.animateHideNShow) {
								jQuery(this).closest('.'+settings.parentSectionClass).fadeIn(100);
							}
							else {
								jQuery(this).closest('.'+settings.parentSectionClass).show();
							}
						}
					});
				}
				
				var textToFilter = jQuery(this).val();
				if (textToFilter.length > 0) {
					if(settings.hideNegatives) {
						//addClass
						if(settings.addClassElems) {
							jQuery('.'+settings.childBlockClass).removeClass('search-results');
						}
						if(settings.addClassParent) {
							jQuery('.'+settings.parentLookupClass).removeClass('search-results');
						}
						if(settings.addClassSection) {
							jQuery('.'+settings.parentSectionClass).removeClass('search-results');
						}
						if(settings.animateHideNShow) {
							if (settings.parentSearchClass != '') {
								jQuery('.'+settings.parentSearchClass).find('.'+settings.parentLookupClass).stop(true, true).fadeOut('slow');
							} else {
								jQuery('.'+settings.parentLookupClass).stop(true, true).fadeOut('slow');
							}
						}
						else {
							if (settings.parentSearchClass != '') {
								jQuery('.'+settings.parentSearchClass).find('.'+settings.parentLookupClass).stop(true, true).hide();
							} else {
								jQuery('.'+settings.parentLookupClass).stop(true, true).hide();
							}
						}
					}
					var _cs = "icontains";
					if(settings.caseSensitive) {
					  _cs = "contains";
					}
					//условие проверки области поиска
					if (settings.parentSearchClass != '') {
						var currentElem = jQuery('.'+settings.parentSearchClass).find('.'+settings.childBlockClass);
					} else {
						var currentElem = jQuery('.'+settings.childBlockClass);
					}
					jQuery.each(currentElem,function(i,obj) {
					  jQuery(obj).html(jQuery(obj).html().replace(new RegExp(rex), "$2"));  
					});
					//условие проверки области поиска
					if (settings.parentSearchClass != '') {
						var currentElem2 = jQuery('.'+settings.parentSearchClass).find('.'+settings.childBlockClass+":"+_cs+"(" + textToFilter + ")");
					} else {
						var currentElem2 = jQuery('.'+settings.childBlockClass+":"+_cs+"(" + textToFilter + ")");
					}
					jQuery.each(currentElem2,function(i,obj) {
						if(settings.hideNegatives) {
							if(settings.animateHideNShow) {
								//jQuery(obj).parent().stop(true, true).fadeIn('slow');
								//jQuery(obj).addClass('search-results').closest('.'+settings.parentLookupClass).stop(true, true).fadeIn('slow');
								if(settings.addClassElems) {
									jQuery(obj).addClass('search-results').closest('.'+settings.parentLookupClass).stop(true, true).fadeIn('slow');
								} else {
									jQuery(obj).closest('.'+settings.parentLookupClass).stop(true, true).fadeIn('slow');
								}
							}
							else {
								//jQuery(obj).parent().stop(true, true).show();
								//jQuery(obj).addClass('search-results').closest('.'+settings.parentLookupClass).stop(true, true).show();
								if(settings.addClassElems) {
									jQuery(obj).addClass('search-results').closest('.'+settings.parentLookupClass).stop(true, true).show();
								} else {
									jQuery(obj).closest('.'+settings.parentLookupClass).stop(true, true).show();
								}
							}
						}
						if(settings.addClassParent) {
							jQuery(obj).closest('.'+settings.parentLookupClass).addClass('search-results');
						}
						if(settings.addClassSection) {
							jQuery(obj).closest('.'+settings.parentSectionClass).addClass('search-results');
						}
						var newhtml = jQuery(obj).text();
						jQuery(obj).html(newhtml.replace(
						new RegExp(textToFilter, rexAtt), 
						function(match) {
							//return ["<span style='background:"+settings.highlightColor+";color:"+settings.textColorForHighlights+"'>", match, "</span>"].join("");
							return ["", match, ""].join("");
							//return ["<span>", match, "</span>"].join("");
						}));
						/*
						jQuery(obj).find('.searchable').each(function () {
							var $elem = $(this);
							$elem.html( $elem.text().replace(
							new RegExp(textToFilter, rexAtt), 
							function(match) {
								return ["<span style='background:"+settings.highlightColor+";color:"+settings.textColorForHighlights+"'>", match, "</span>"].join("");
							}));
						});*/
					});
					
					//вызов функции для оценки пустоты родителя
					if (settings.parentSectionClass != '') {
						if(settings.animateHideNShow) {
							setTimeout(hideSection, 1000);
						}
						else {
							hideSection();
						}
					}
					
				} else { //все стерли из строки
					//условие проверки области поиска
					if (settings.parentSearchClass != '') {
						var currentElem = jQuery('.'+settings.parentSearchClass).find('.'+settings.childBlockClass);
					} else {
						var currentElem = jQuery('.'+settings.childBlockClass);
					}
					jQuery.each(currentElem,function(i,obj) {
						var html = jQuery(obj).html().replace(new RegExp(rex), "$2");
						if(settings.addClassElems) {
							jQuery(obj).removeClass('search-results').html(html);
						} else {
							jQuery(obj).html(html);
						}
						if(settings.addClassParent) {
							jQuery(obj).closest('.'+settings.parentLookupClass).removeClass('search-results');
						}
						if(settings.addClassSection) {
							jQuery(obj).closest('.'+settings.parentSectionClass).removeClass('search-results');
						}
					});
					if(settings.hideNegatives) {
						//условие проверки области поиска
						if (settings.parentSearchClass != '') {
							if (settings.parentSectionClass != '') {
								var currentElem2 = jQuery('.'+settings.parentSearchClass).find('.'+settings.parentSectionClass);
							}
							var currentElem3 = jQuery('.'+settings.parentSearchClass).find('.'+settings.parentLookupClass);
						} else {
							if (settings.parentSectionClass != '') {
								var currentElem2 = jQuery('.'+settings.parentSectionClass);
							}
							var currentElem3 = jQuery('.'+settings.parentLookupClass);
						}
						
						if(settings.animateHideNShow) {
							if (settings.parentSectionClass != '') {
								currentElem2.stop(true, true).fadeIn('slow');
							}
							currentElem3.stop(true, true).fadeIn('slow');
						}
						else {
							if (settings.parentSectionClass != '') {
								currentElem2.stop(true, true).show();
							}
							currentElem3.stop(true, true).show();
						}
					}
				}
			}
		});
	});
};


//SLIDERS
if ($('.mainslider').length > 0) {
	$('.mainslider').slick({
		//autoplay: true,
		//infinite: false,
		dots: true,
		arrows: false,
		accessibility: false,
		slidesToShow: 1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
}


//SLICK FIX
if ($('.objects-slider').length > 0) {
	var slider = $('.objects-slider');
	slider.slick({
		//autoplay: true,
		//infinite: false,
		infinite: true,
		dots: true,
		arrows: true,
		accessibility: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplaySpeed: 3000,
		speed: 500,
		waitForAnimate: false,
		//asNavFor:'',
		//appendDots:
		appendDots: $('.objects-controls'),
		appendArrows: $('.objects-controls'),
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		}]
	});
	var sltoshow = slider.get(0).slick.options.slidesToShow;
	var all = slider.find('.slick-slide').length;
	var allactive = slider.find('.slick-slide').not('.slick-cloned').length;
	slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (nextSlide == 0) {
			var ind = all - allactive;
			if (sltoshow == 1) {
				slider.find('.slick-slide').eq(ind).addClass('active');
			} else {
				sliderfix(slider, ind);
			}
		}
		if (nextSlide == allactive - 1) {
			if (sltoshow == 1) {
				slider.find('.slick-slide').eq(0).addClass('active');
			} else {
				sliderfix(slider, sltoshow - 1);
			}
		}

		//DIRECTION
		if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
			direction = 'prev';
		} else if (nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0)) {
			direction = 'next';
		} else {
			direction = 'prev';
		}
		//console.log(direction);
	});
	slider.on('afterChange', function (event, slick, currentSlide) {
		slider.find('.slick-slide').removeClass('active');
	});
	function sliderfix(slider, v) {
		for (var i = 0; i < sltoshow; i++) {
			var n = v + i;
			slider.find('.slick-slide').eq(n).addClass('active');
		}
	}


}

if ($('.newsmodule-slider').length > 0) {
	$('.newsmodule-slider').slick({
		//autoplay: true,
		//infinite: false,
		fade: true,
		dots: false,
		arrows: false,
		accessibility: false,
		slidesToShow: 1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow: '<button type="button" class="slick-next fa fa-angle-right"></button>',
		prevArrow: '<button type="button" class="slick-prev fa fa-angle-left"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {}
		}]
	});
	//Опция
	$('.newsmodule-slider').get(0).slick.options.slidesToShow

	$('.newsmodule-items-item').click(function (event) {
		$('.newsmodule-items-item').removeClass('active');
		$(this).addClass('active');
		$('.newsmodule-slider').slick('goTo', $(this).index());
	});
	$('.newsmodule-navigator-info span').eq(1).html($('.newsmodule-items-item').length);

	$('.newsmodule-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.newsmodule-navigator-info span').eq(0).html(nextSlide + 1);
	});
	$('.newsmodule-slider').on('afterChange', function (event, slick, currentSlide) {
		$('.newsmodule-navigator-info span').eq(0).html(currentSlide + 1);
	});
	$('.newsmodule-navigator__arrow.fa-angle-left').click(function (event) {
		$('.newsmodule-slider').slick('slickPrev');
	});
	$('.newsmodule-navigator__arrow.fa-angle-right').click(function (event) {
		$('.newsmodule-slider').slick('slickNext');
	});
}

	sectors($(this).scrollTop());
$(window).scroll(function(event) {
		var scr=$(this).scrollTop();
	sectors(scr);
});
function sectors(scr){
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var headerheight=80;
	if(w<768){headerheight=50;}
	if(scr>0){
		$('header').addClass('scroll');
	}else{
		$('header').removeClass('scroll');
	}
	if(scr>h){
		$('#up').fadeIn(300);
	}else{
		$('#up').fadeOut(300);
	}
	$.each($('.sector'), function(index, val) {
			var th=$(this).outerHeight();
			var tot=$(this).offset().top;
		if(scr>=tot && scr<=tot+th-h){
			$('.sector.scroll').removeClass('scroll');
			$(this).addClass('scroll');
		}
		if($(this).hasClass('scroll')){
			if(scr>=tot && scr<=tot+th-h){
				if($(this).hasClass('normalscroll')){
					$('body').addClass('scroll');
				}else{
					$('body').removeClass('scroll');
				}
			}else{
				if($(this).hasClass('normalscroll')){
					$('body').removeClass('scroll');
				}
			}
		}
		if(scr>tot-h/1.5 && scr<tot+th){
			if($('.dotts').length>0){
				dotts(index,0);
			}
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
		if(scr>tot-h && scr<tot+th){
			$(this).addClass('view');
			if($(this).hasClass('padding')){
					var ps=100-(tot-scr)/h*100;
					var p=headerheight/100*ps;
				if(p>=headerheight){p=headerheight;}
				$(this).css({paddingTop:p});
			}
		}else{
			$(this).removeClass('view');
		}
	});
	/*
	$.each($('.lz').not('.load'), function(index, val) {
			var img=$(this).data('image');
		if(scr>tot-h && scr<tot+th){
			$(this).html('<img src="'+img+'" alt="" />');
			$(this).addClass('load');
		}
	});
	*/
}
function dotts(ind,init){
	if(init==true){
		$.each($('.sector'), function(index, val) {
			$('.dotts-list').append('<li></li>');
		});
	}
	$('.dotts-list li').removeClass('active').eq(ind).addClass('active');
}
$('body').on('click', '.dotts-list li', function(event) {
		var n=$(this).index()+1;
		var offset=0;
	$('body,html').animate({scrollTop: $('.sector-'+n).offset().top+offset},800, function() {});
});
function map(n){
	google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView(); 
		ov.onAdd = function() { 
			var proj = this.getProjection(); 
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x+offsetX;
			aPoint.y = aPoint.y+offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function() {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055,27.8813694)],
		[new google.maps.LatLng(53.700055,27.5513694)],
		[new google.maps.LatLng(53.809055,27.5813694)],
		[new google.maps.LatLng(53.859055,27.5013694)],
	]
	var options = {
		zoom: 10,
		panControl:false,
		mapTypeControl:false,
		center: locations[0][0],
		styles:[{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
		scrollwheel:false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}; 
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon={
		url:'img/icons/map.svg',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon:icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
					var cnt=i+1;
				infowindow.setContent($('.contacts-map-item_'+cnt).html());
				infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(),0,0);
				setTimeout(function(){
					baloonstyle();
				},10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if(n){
			var nc=n-1;
		setTimeout(function(){
			google.maps.event.trigger(markers[nc], 'click');
		},500);
	}
}
function baloonstyle(){
	$('.gm-style-iw').parent().addClass('baloon');
	$('.gm-style-iw').prev().addClass('baloon-style');
	$('.gm-style-iw').next().addClass('baloon-close');
	$('.gm-style-iw').addClass('baloon-content');
}
if($("#map").length>0){
	map(1);
}


/* YA
function map(n){
	ymaps.ready(init);
	function init(){ 
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			controls: [],
			center: [43.585525,39.723062],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 10
		});
		
		myPlacemar = new ymaps.Placemark([43.585525,39.723062],{
			id:'2'
		},{
			// Опции.
			hasBalloon:false,
			hideIconOnBalloonOpen:false,
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'img/icons/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0,0],
		});
		myMap.geoObjects.add(myPlacemar);

		myMap.behaviors.disable('scrollZoom');
	}
}
*/
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
const imageFixed = document.querySelector('.mainblock__image')

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');
	imageFixed.classList.add('lock-padding')

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
		imageFixed.classList.remove('lock-padding')
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) { }

if (location.hash) {
	var hsh = location.hash.replace('#', '');
	if ($('.popup-' + hsh).length > 0) {
		popupOpen(hsh);
	} else if ($('div.' + hsh).length > 0) {
		$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
	}
}
$('.wrapper').addClass('loaded');

var act = "click";
if (isMobile.iOS()) {
	var act = "touchstart";
}

$('.header-menu__icon').click(function (event) {
	$(this).toggleClass('active');
	$('.header-menu').toggleClass('active');
	if ($(this).hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	$('body').toggleClass('lock');
	if (!$(this).hasClass('active')) {
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
});

//ZOOM
if ($('.gallery').length > 0) {
	baguetteBox.run('.gallery', {
		// Custom options
	});
}
/*
CLOUD-ZOOM
<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
	<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
</a>
*/


//POPUP


$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

	if ($('.header-menu').hasClass('active')) {
		$('.header-menu,.header-menu__icon').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});

function ibg() {
	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();

//Клик вне области
$(document).on('click touchstart', function (e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

//UP
$(window).scroll(function () {
	var w = $(window).width();
	if ($(window).scrollTop() > 50) {
		$('#up').fadeIn(300);
	} else {
		$('#up').fadeOut(300);
	}
});
$('#up').click(function (event) {
	$('body,html').animate({ scrollTop: 0 }, 300);
});

$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
$.each($('.spoller.active'), function (index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function (event) {
	if ($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}
	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
		if ($(this).parent().find('.slick-slider').length > 0) {
			$(this).parent().find('.slick-slider').slick('setPosition');
		}
	});
	return false;
});



function scrolloptions() {
	var scs = 100;
	var mss = 50;
	var bns = false;
	if (isMobile.any()) {
		scs = 10;
		mss = 1;
		bns = true;
	}
	var opt = {
		cursorcolor: "#fff",
		cursorwidth: "4px",
		background: "",
		autohidemode: true,
		cursoropacitymax: 0.4,
		bouncescroll: bns,
		cursorborderradius: "0px",
		scrollspeed: scs,
		mousescrollstep: mss,
		directionlockdeadzone: 0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
function scroll() {
	$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
}
if (navigator.appVersion.indexOf("Mac") != -1) {
} else {
	if ($('.scroll-body').length > 0) { scroll(); }
}

/*
function scrollwhouse(){
		var scs=100;
		var mss=50;
		var bns=false;
	if(isMobile.any()){
		scs=10;
		mss=1;
		bns=true;
	}
	var opt={
		cursorcolor:"#afafaf",
		cursorwidth: "5px",
		background: "",
		autohidemode:false,
		railalign: 'left',
		cursoropacitymax: 1,
		bouncescroll:bns,
		cursorborderradius: "0px",
		scrollspeed:scs,
		mousescrollstep:mss,
		directionlockdeadzone:0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
$('.whouse-content-body').scroll(function(event) {
		var s=$(this).scrollTop();
		var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
		var p=s/r*100;
	$('.whouse-content__shadow').css({opacity:1-1/100*p});
});
*/


if ($('.t,.tip').length > 0) {
	tip();
}
function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector:true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) { },
		onHide: function ($element) { },
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}

$(window).resize(function (event) {
	mainblock();
});
function mainblock() {
	var h = $(window).outerHeight();
	$('.mainblock').css('min-height', h);
}
mainblock();

//Подключение slick-slider

$(document).ready(function () {
	$('.slider').slick();
});
//Сполер
$(document).ready(function () {
	$('.spoller__title').click(function (event) {
		if ($('.menublock__row').hasClass('one')) {
			$('.spoller__title').not($(this)).removeClass('active');
			$('.spoller__text').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});
});

//Подключение Swiper slider


var mySwiper = new Swiper('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',
	loop: false,
	autoHeight: true,
	speed: 1000,
	parallax: true,


	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},
})

//Добавляем класс AVTIIVE к ссылкам меню

$(document).ready(function () {
	$('.header-right-menu__link').click(function () {
		$('.header-right-menu__link').removeClass('active');
		$(this).addClass('active');
	});
});

});