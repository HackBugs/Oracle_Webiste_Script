jQuery(document).ready(function($) {

	$(document).on('click', '.paoc-popup', function() {
		var target	= $(this).data('target');
		if( typeof( target ) !== 'undefined' ) {
			var options = $(this).data('conf');
			if( options ) {
				new Custombox.modal(options).open();
			}
		}
	});

	/* Custom Popup Link */
	$(document).on('click', '.paoc-close-popup', function(e) {
		Custombox.modal.close();
		return false;
	});	
});