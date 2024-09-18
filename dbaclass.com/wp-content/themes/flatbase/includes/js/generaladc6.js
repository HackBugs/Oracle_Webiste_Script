/* global script variables */
var $parallex_effect = true;
var window_width = 0;

jQuery(document).ready(function($){

	/* Handles functionality that depends on window resize */
	window_width = Math.max( jQuery( window ).width(), window.innerWidth );
	jQuery( window ).resize(function() {
		adjust_nav_functionality();
	});

	// superfish
	if ( window_width > 1024 ){
		jQuery('#header #main-nav').superfish({
			disableHI: true
		});
	}

	/*
		Livesearch label
	*/

	jQuery('#live-search input[type="text"]').each(function(){

			if(this.value != '' ){
				jQuery('label[for=' + jQuery(this).attr('name') + ']').addClass('has-text');
			}

			jQuery(this).focus(function(){
				if( this.value == '' ) {
					jQuery('label[for=' + jQuery(this).attr('name') + ']').addClass('focus');
				}
			});

			jQuery(this).keyup(function(){

				if( this.value != ''){
					jQuery('label[for=' + jQuery(this).attr('name') + ']').addClass('has-text');
				}else{
					jQuery('label[for=' + jQuery(this).attr('name') + ']').removeClass('has-text');
					jQuery('label[for=' + jQuery(this).attr('name') + ']').addClass('focus');
				}

			});

			jQuery(this).blur(function(){
				if(this.value == '') {
					jQuery('label[for=' + jQuery(this).attr('name') + ']').removeClass('has-text');
					jQuery('label[for=' + jQuery(this).attr('name') + ']').removeClass('focus');
				}
			});
	});


	/* FAQs */
	jQuery('body.page-template-template-faq-scroll-php').localScroll();
	/*-----------------------------------------------------------------------------------*/
	/* FAQs
	/*-----------------------------------------------------------------------------------*/

	jQuery('.faq .faq-title').click(function(e) {
		e.preventDefault();
		jQuery(this).toggleClass("active").parent().next().slideToggle();
		console.log(jQuery(this).next());
		return false;
	});

	jQuery('button').click(function(e) {

		if ( jQuery(this).hasClass('grid') ) {
			jQuery('#content .row .column').removeClass('list').addClass('grid');
		}
		else if( jQuery(this).hasClass('list') ) {
			jQuery('#content .row .column').removeClass('grid').addClass('list');
		}
	});

	/* fancybox */
	jQuery('.fancybox').fancybox();

	/* superfish */
	jQuery('#header #main-nav').superfish( {
		delay: 1000, // one second delay on mouseout
		animation: {opacity:'show'/*,height:'show'*/},  // fade-in and slide-down animation
		speed: 'slow'
	});

	/* miscellaneous */

	var $is_backtotop_displayed = false;
	var $scroll_position = 0;

	if(jQuery.browser.msie || jQuery.browser.mozilla){ Screen = jQuery("html");}
	else {Screen = jQuery("body");}

	jQuery(window).scroll(function () {

		$scroll_position = jQuery(this).scrollTop();

		/* Handles displaying and hiding back to top button */
		if ( $scroll_position < 100 && $is_backtotop_displayed ) {

				jQuery('.backtotop').animate({
						bottom: '-30px'
				}, 100);

				$is_backtotop_displayed = false;
		} else if ( $scroll_position > 100 && !$is_backtotop_displayed ) {

				jQuery('.backtotop').animate({
						bottom: '17px'
				}, 100);

				$is_backtotop_displayed = true;
		}

		if ( window_width > 1024 ){
			var scrollPos = jQuery(window).scrollTop();
			if ( jQuery("#header").outerHeight() > 0)
			{
				var nice_height = ( jQuery("#live-search").outerHeight() + jQuery("#header #top").outerHeight() ) - $scroll_position / 6;
				jQuery("#header").css('height', nice_height + 'px');
			}else{
				jQuery("#header").css('height', nice_height + 'px');
			}

			$ratio = $scroll_position / ( jQuery( '.welcome-message' ).outerHeight() + 200);
			$welcome_message_opacity = 1 - $ratio;
			if ( $welcome_message_opacity <= 1 && $welcome_message_opacity >= 0 ) {
				jQuery( '.welcome-message' ).css( 'opacity', $welcome_message_opacity );
			}
		}

	});

	// scroll body to 0px on click on back to top button
	jQuery('.backtotop').click(function () {
		jQuery('html, body').animate({
				scrollTop: 0
		}, 800);
		return false;
	});

});

jQuery(window).load(function($){

	/* Handles responsive menu */
	jQuery("#header #top #toggle-nav").click(function() {
		jQuery("#header #navigation").slideToggle( 'slow' );
		return false;
	});

	jQuery('#navigation .nav li .sub-menu').siblings('.down-arrow').addClass('active-down-arrow');
	adjust_nav_functionality();
	jQuery("#header #navigation li .active-down-arrow").click(function() {
		jQuery(this).siblings(".sub-menu").toggle();
		return false;
	});

});


/**
 *  Adjusts functionality of header navigation
 */
function adjust_nav_functionality() {
	window_width = Math.max( jQuery( window ).width(), window.innerWidth );
	if( window_width > 1024 ){
		jQuery('#navigation li .down-arrow-anchor .down-arrow, .active-down-arrow').hide();
		jQuery('#header #navigation').show();
	}else if( window_width <= 1024 ){
		jQuery('#navigation li .down-arrow-anchor .down-arrow, .active-down-arrow').show();
		jQuery('#header #navigation').hide();
	}
}

/* Handles like functionality */
function nicethemes_likes_handler() {

	jQuery('.nice-like').click( function(){

			var $button = jQuery(this);
			if( ! $button.hasClass( 'liked' ) ) {

				jQuery.ajax({
					type: "POST",
					url: php_data.admin_ajax_url,
					data: 'action=nicethemes_likes_add&nonce=' + php_data.play_nice_nonce + '&id=' + $button.data('id'),
					success: function( likes ) {
						if ( likes != '' ){

							$button.addClass( 'liked' ); // set liked class
							$button.find('.like-count').html( likes ); // print number of likes

						}
					}
				});

			}
		return false;
	});
}