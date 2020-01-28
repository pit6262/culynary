
$(window).on('load', function(){
	$('body').removeClass('loaded');
});

$(function(){

	/* Burger */
	/* ---------------------------------------------- */

	$(".toggle-menu").on('click',function(){
		$(this).toggleClass("is-active");
		$('.mobile-menu').toggleClass('is-open')
		return false;
	});

	$(".rubric__button").on('click',function(){
		$(this).toggleClass("is-active").parent().toggleClass("is-open");
		$('.nav-rubric').slideToggle(300)
		return false;
	});

	$(".rubric .nr-dropdown > a").on('click',function(){
		$(".rubric .nr-dropdown").not($(this).parent()).removeClass('is-active')
		$(this).parent().toggleClass("is-active")
		return false;
	});

	$(".sidebar  .nr-dropdown > a").on('click',function(){
		$(".sidebar  .nr-dropdown").not($(this).parent()).removeClass('is-active')
		$(this).parent().toggleClass("is-active")
		return false;
	});


	$('.js-minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count + ' Порции');
		$input.change();
		return false;
	});
	$('.js-plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1 + ' Порции');
		$input.change();
		return false;
	});

	function filter() {
		
		$('.filter__button').on('click', function(){
			var thisFilter = $(this)
			 $(".filter__button")
				.not(thisFilter)
				.removeClass("is-active")
				.parents(".filter")
				.removeClass("is-open")
				.find(".filter__dropdown")
				.slideUp(200);
			$(this)
				.toggleClass("is-active")
				.parents(".filter")
				.toggleClass("is-open")
				.find(".filter__dropdown")
				.slideToggle(200);
		});

			

		$('.filter__list li ').on('click', function(){
			$(this).toggleClass('is-selected');
			var parent = $(this).parents(".filter");
			var count = $(this)
				.parent()
				.find("li.is-selected").length;
			parent.find(".filter__count").html(count);
		})
	}
	filter();

	// Поиск в выпадающем списке
	function searchBox() {
		var ul = $('.filter');
		var input = ul.find('.filter__search input');
		var li = ul.find('li');

		input.keyup(function(){
		  
		    var value = $(this).val().toLowerCase();
		    li.filter(function() {
		      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

			});
		 })
	}
	searchBox();


	function ingredients() {
		
		$('.ingredients-table__row').on('click', function(){
			if ($(this).find('input[type="checkbox"]:checked').length) {
				$(this).addClass('is-checked');
			} else {
				$(this).removeClass('is-checked');
			}
		})
	}
	ingredients();

	
	/* Popup  */
	/* ---------------------------------------------- */

	var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};

	if(location.hash){
		var hsh=location.hash.replace('#','');
		if($('.popup-'+hsh).length>0){
			popupOpen(hsh);
		}else if($('div.'+hsh).length>0){
			$('body,html').animate({scrollTop:$('div.'+hsh).offset().top,},500, function(){});
		}
	}

	var act="click";
	if(isMobile.iOS()){
		var act="touchstart";
	}

	$('.popup-open').click(function(event) {
		var popup = $(this).attr('href').replace('#','');
		var video = $(this).data('video');
		popupOpen(popup,video);
		return false;
	});
	function popupOpen(popup,video){
		$('.popup').removeClass('active').hide();
		
		if(!isMobile.any()){
			$('body').css({paddingRight:$(window).outerWidth()-$('.main-wrapper').outerWidth()}).addClass('lock');
			// $('.pdb').css({paddingRight:$(window).outerWidth()-$('.main-wrapper').outerWidth()});
		}else{
			setTimeout(function() {
				$('body').addClass('lock');
			},300);
		}
		history.pushState('', '', '#'+popup);
		if(video!='' && video!=null){
			$('.popup-'+popup+' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/'+v+'?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		}
		$('.popup-'+popup).fadeIn(300).delay(300).addClass('active');

		if($('.popup-'+popup).find('.slick-slider').length>0){
			$('.popup-'+popup).find('.slick-slider').slick('setPosition');
		}
	}

	function popupClose(){
		$('.popup').removeClass('active').fadeOut(300);
		
		if(!isMobile.any()){
			setTimeout(function() {
				$('body').css({paddingRight:0});
				// $('.pdb').css({paddingRight:0});
			},200);
			setTimeout(function() {
				$('body').removeClass('lock');

			},200);
		}else{
			$('body').removeClass('lock');
		}

		$('.popup-video__value').html('');

		history.pushState('', '', window.location.href.split('#')[0]);
	}
	$('.popup-close,.popup__close').on('click', function(event) {
		popupClose();
		return false;
	});
	$('.popup').on('click', function(e) {
		if (!$(e.target).is(".popup>.popup-container *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
			popupClose();
			return false;
		}
	});
	$(document).on('keydown',function(e) {
		if(e.which==27){
			popupClose();
		}
	});

	/* Forms  */
	/* ---------------------------------------------- */
	$('input.form-input, textarea.form-input').focus(function(){
		var label = $(this).prev('.placeholder');
		var value = $(this).val();

		if(value == ''){
			label.stop().hide();
			$(this).parent().addClass('focus')
		} else {
			label.hide();

		}
	}).blur(function(){
		var label = $(this).prev('.placeholder');
		var value = $(this).val();
		if ($(this).hasClass('tel')) {
		    if(value == '' || !full){
		      label.stop().show();
		      $(this).parent().removeClass('focus')
		    }
		   } else {
		   	 if(value == ''){
		      label.stop().show();
		      $(this).parent().removeClass('focus')
		    }
		   }

	});


	/* Plugins */
	/* ---------------------------------------------- */

	if($('.filter__list').length){
		$('.filter__list').overlayScrollbars({

		}); 
	}

	/* Styler */
	if($('.styler').length){
		$('.styler').styler({
			singleSelectzIndex: '5',
			selectVisibleOptions: '7',
		});
	};

	/* Slick Slider */
	

	if($('.new-slider').length){

		$('.new-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			appendArrows: '.csp1',
			responsive: [{
				breakpoint: 992, 
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				} 
			},{
				breakpoint: 768, 
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: true,
				} 
			},
			]
			

		});
	};
	if($('.best-slider').length){

		$('.best-slider').slick({
			
			slidesToShow: 3,
			slidesToScroll: 1,
			appendArrows: '.csp2',
			responsive: [{
				breakpoint: 992, 
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				} 
			},{
				breakpoint: 768, 
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: true,
				} 
			},
			]

		});
	};

	if($('.rubric-slider').length){

		$('.rubric-slider').slick({
			
			slidesToShow: 3,
			slidesToScroll: 1,
			appendArrows: '.csp3',
			responsive: [{
				breakpoint: 992, 
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				} 
			},{
				breakpoint: 768, 
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					variableWidth: true,
				} 
			},
			]

		});
	};

	$slick_slider = $('.crs-slider');
	var settings = {
		slidesToShow: 6,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-arrow slick-arrow2 slick-prev"></button>',
		nextArrow: '<button class="slick-arrow slick-arrow2 slick-next"></button>',
		responsive: [{
			breakpoint: 1350, 
			settings: {
				arrows: false,
				
			} 
		},{
			breakpoint: 1200, 
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: false,
				
			} 
		},{
			breakpoint: 992, 
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
				
			} 
		},{
			breakpoint: 768, 
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				variableWidth: true,
				
			} 
		},
		]
	}
	$slick_slider.slick(settings);
	
	$(".open-all-cards").on('click',function(){

		if ($slick_slider.hasClass('slick-initialized')) {
			$slick_slider.slick('unslick');
		} else if (!$slick_slider.hasClass('slick-initialized')) {
			return $slick_slider.slick(settings);
		}

	});
	if($('.crs-slider').length){

		$('.crs-slider').slick({
			
			slidesToShow: 6,
			slidesToScroll: 1,
			prevArrow: '<button class="slick-arrow slick-arrow2 slick-prev"></button>',
			nextArrow: '<button class="slick-arrow slick-arrow2 slick-next"></button>',
			responsive: [{
				breakpoint: 1350, 
				settings: {
					arrows: false,
					
				} 
			},{
				breakpoint: 1200, 
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					arrows: false,
					
				} 
			},{
				breakpoint: 992, 
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: false,
					
				} 
			},{
				breakpoint: 768, 
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					variableWidth: true,
					
				} 
			},
			]
			

		});
	};

	if($('.pr-steps-slider').length){

		$('.pr-steps-slider').slick({
			
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: true,
			infinite: false,
			adaptiveHeight: true,
			appendArrows: '.popup-rec .box-paging',
			appendDots: '.popup-rec .box-paging',
			fade: true,
			customPaging: function(slick, index) {
			    return '<button type="button"><span class="dotted">' + ++index+ '</span></button>'
			  }
			

		});
	};


});