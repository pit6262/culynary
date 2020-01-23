
$(window).on('load', function(){
	$('body').removeClass('loaded');
});

$(function(){

	/* Burger */
	/* ---------------------------------------------- */

	$(".toggle-menu").on('click',function(){
		$(this).toggleClass("is-active");
		$('.mobile-menu').toggleClass('is-open')
	});

	$(".rubric__button").on('click',function(){
		$(this).toggleClass("is-active").parent().toggleClass("is-open");
		$('.nav-rubric').slideToggle(300)
	});

	$(".nr-dropdown").on('click',function(){
		$(".nr-dropdown").not($(this)).removeClass('is-active')
		$(this).toggleClass("is-active")
	});

	

	/* Forms  */
	/* ---------------------------------------------- */
	// $('input.form-input').focus(function(){
	// 	var label = $(this).prev('.label');
	// 	var value = $(this).val();

	// 	if(value == ''){
	// 		label.stop().css({ 'top': '.3rem', });
	// 		$(this).parent().addClass('focus')
	// 	} else {
	// 		label.css({ 'top': '.3rem' });

	// 	}
	// }).blur(function(){
	// 	var label = $(this).prev('.label');
	// 	var value = $(this).val();
	// 	var full = value.replace(/\+7\(\d{3}\) \d{3} \d{4}/g, "")=="" ? true: false;
	// 	if ($(this).hasClass('tel')) {
	// 	    if(value == '' || !full){
	// 	      label.stop().css({ 'top': '1.3rem', });
	// 	      $(this).parent().removeClass('focus')
	// 	    }
	// 	   } else {
	// 	   	 if(value == ''){
	// 	      label.stop().css({ 'top': '1.3rem', });
	// 	      $(this).parent().removeClass('focus')
	// 	    }
	// 	   }

	// });

	// var sliderValue = [1, 17, 33, 65];
	//  $( "#range" ).slider({
	// 	range: 'max',
	// 	min: 1,
	// 	max: 65,
	// 	value: 33,
	// 	step: 1,
	// 	slide: function( event, ui ) {
 //           if( sliderValue.indexOf(ui.value)===-1 ) return false;
           
 //        }
	// });

	// $( "#range" ).val( $( "#slider-range-max" ).slider( "value" ) );



	/* Plugins */
	/* ---------------------------------------------- */

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

});